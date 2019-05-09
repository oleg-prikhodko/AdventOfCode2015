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

for (let aunt of auntStrings) {
  let [, auntIndex, auntTraits] = auntPattern.exec(aunt)
  auntTraits = eval(`({${auntTraits}})`)

  let allTraitsCoincide = true
  for (let trait of Object.keys(auntTraits)) {
    if (trait === 'cats' || trait === 'trees') {
      if (auntTraits[trait] <= targetTraits[trait]) {
        allTraitsCoincide = false
        break
      }
    } else if (trait === 'pomeranians' || trait === 'goldfish') {
      if (auntTraits[trait] >= targetTraits[trait]) {
        allTraitsCoincide = false
        break
      }
    } else {
      if (targetTraits[trait] !== auntTraits[trait]) {
        allTraitsCoincide = false
        break
      }
    }
  }
  if (allTraitsCoincide) suitableAunts.set(auntIndex, auntTraits)
}

console.log(suitableAunts)
