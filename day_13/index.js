const { readFileSync } = require('fs')
const { join } = require('path')
const { permute } = require('../utils')

const contents = readFileSync(join(__dirname, 'input.txt'), 'utf8').trim()
const persons = new Set()
const happinessTable = new Map()
const linePattern = /(\w+) would (.+) happiness .+ (\w+)\./

function getIntegerHappinessChange (change) {
  let [_, sign, value] = /(\w+) (\d+)/.exec(change)
  value = parseInt(value)
  if (sign === 'lose') value = -value
  return value
}

for (let line of contents.split('\n')) {
  const [_, person, change, neighbour] = linePattern.exec(line)
  persons.add(person)
  happinessTable.set(
    `${person} ${neighbour}`,
    getIntegerHappinessChange(change)
  )
}

function calcArrangementHappiness (arrangement) {
  const length = arrangement.length
  return arrangement.reduce((happiness, person, index, persons) => {
    const prevNeighbour = index > 0 ? persons[index - 1] : persons[length - 1]
    const nextNeighbour = index < length - 1 ? persons[index + 1] : persons[0]
    const arrangementHappiness = happiness +
            happinessTable.get(`${person} ${prevNeighbour}`) +
            happinessTable.get(`${person} ${nextNeighbour}`)
    return arrangementHappiness
  }, 0)
}

function getOptimalHappiness () {
  const permutations = [...permute(Array.from(persons))]
  const happinessVals = permutations.map(calcArrangementHappiness)
  happinessVals.sort((a, b) => (b - a))
  return happinessVals[0]
}

console.log('Part one:', getOptimalHappiness())

for (let person of persons.values()) {
  happinessTable.set(`myself ${person}`, 0)
  happinessTable.set(`${person} myself`, 0)
}
persons.add('myself')

console.log('Part two:', getOptimalHappiness())
