const { readFileSync } = require('fs')
const { join } = require('path')

const targetTraits = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
}

const contents = readFileSync(join(__dirname, 'input.txt'), 'utf8').trim()
const auntPattern = /Sue (\d+): (.+)$/
const auntStrings = contents.split('\n')

const suitableAunts = new Map()

const equals = (value1, value2) => value1 === value2
const less = (value1, value2) => value1 < value2
const more = (value1, value2) => value1 > value2

function getComparator (trait, part = 1) {
  if (part === 1) return equals
  if (trait === 'cats' || trait === 'trees') {
    return more
  } else if (trait === 'pomeranians' || trait === 'goldfish') {
    return less
  } else {
    return equals
  }
}

for (let aunt of auntStrings) {
  let [, auntIndex, auntTraits] = auntPattern.exec(aunt)
  auntTraits = eval(`({${auntTraits}})`)
  let allTraitsCoincide = true

  for (let trait of Object.keys(auntTraits)) {
    if (!getComparator(trait, 2)(auntTraits[trait], targetTraits[trait])) {
      allTraitsCoincide = false
      break
    }
  }
  if (allTraitsCoincide) suitableAunts.set(auntIndex, auntTraits)
}

console.log(suitableAunts)
