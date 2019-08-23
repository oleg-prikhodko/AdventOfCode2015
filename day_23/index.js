const { readFileSync } = require('fs')
const { join, dirname } = require('path')

function isEven (val) {
  return val % 2 === 0
}

function isOne (val) {
  return val === 1
}

let state = null

const instructions = new Map([
  [/hlf (?<reg>\w)/, ({ reg }) => ({
    [reg]: state[reg] / 2,
    execLine: state.execLine + 1
  })],
  [/tpl (?<reg>\w)/, ({ reg }) => ({
    [reg]: state[reg] * 3,
    execLine: state.execLine + 1
  })],
  [/inc (?<reg>\w)/, ({ reg }) => ({
    [reg]: state[reg] + 1,
    execLine: state.execLine + 1
  })],
  [/jmp (?<offset>[+-]\d+)/, ({ offset }) => ({
    execLine: state.execLine + parseInt(offset)
  })],
  [/jie (?<reg>\w), (?<offset>[+-]\d+)/, ({ reg, offset }) => ({
    execLine: isEven(state[reg]) ? state.execLine + parseInt(offset) : state.execLine + 1
  })],
  [/jio (?<reg>\w), (?<offset>[+-]\d+)/, ({ reg, offset }) => ({
    execLine: isOne(state[reg]) ? state.execLine + parseInt(offset) : state.execLine + 1
  })]
])

function execute (command) {
  for (const [pattern, fn] of instructions.entries()) {
    if (pattern.test(command)) {
      state = { ...state, ...fn(pattern.exec(command).groups) }
      break
    }
  }
}

function run () {
  while (state.execLine >= 0 && state.execLine < program.length) {
    execute(program[state.execLine])
  }
  console.log(state.b)
}

const program = readFileSync(join(dirname(__filename), 'input.txt'), 'utf8')
  .trim()
  .split('\n')
const initialState = {
  execLine: 0,
  a: 0,
  b: 0
}
// part one
state = Object.assign({}, initialState)
run()
// part two
state = Object.assign({}, { ...initialState, a: 1 })
run()
