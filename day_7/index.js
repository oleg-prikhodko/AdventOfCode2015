const { readFile } = require("fs").promises;
const path = require("path");

const operators = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    LSHIFT: (a, b) => (a << b) & 0xFFFF,
    RSHIFT: (a, b) => (a >> b) & 0xFFFF,
    NOT: a => ~a & 0xFFFF,
    DUMMY: a => a
}

const nodes = new Map()

class Node {
    constructor(operator, ...deps) {
        this.operator = operator
        this.deps = deps
    }
    value() {
        this.deps.forEach((value, index, arr) => {
            if (parseInt(value) || value == 0) {
                arr[index] = parseInt(value)
            } else {
                if (!nodes.get(value)) console.log(value, this.operator, this.deps)
                arr[index] = nodes.get(value).value()
            }
        })
        return this.operator(...this.deps)
    }
}

function nodesFromInstructions(instructions) {
    const binaryOp = /(\w{1,2}) (\w+) (\w{1,2})/
    const unaryOp = /(\w+) (\w{1,2})/

    for (let instruction of instructions) {
        const [expression, id] = instruction.split(' -> ')
        if (binaryOp.test(expression)) {
            const [_, dep1, op, dep2] = binaryOp.exec(expression)
            nodes.set(id, new Node(operators[op], dep1, dep2))
        } else if (unaryOp.test(expression)) {
            const [_, op, dep] = unaryOp.exec(expression)
            nodes.set(id, new Node(operators[op], dep))
        } else {
            nodes.set(id, new Node(operators.DUMMY, expression))
        }
    }
}

readFile(path.join(__dirname, "input.txt"), "utf8")
    .then(contents => {
        const instructions = contents.trim().split("\n")

        nodesFromInstructions(instructions)
        let aValue = nodes.get('a').value()
        console.log("Part one", aValue)

        nodesFromInstructions(instructions)
        nodes.set('b', new Node(operators.DUMMY, aValue))
        aValue = nodes.get('a').value()
        console.log("Part two", aValue)
    })