const { readFileSync } = require('fs')
const { join } = require('path')
const { combine } = require('../utils')

const contents = readFileSync(join(__dirname, 'input.txt'), 'utf8')
const containers = contents.trim().split('\n').map(value => parseInt(value))
const targetSum = 150

const allCombinations = []
let minLength = containers.length

for (let k = 2; k <= containers.length - 1; k++) {
  const combos = combine(containers, k)
  combos.forEach(combo => {
    const sum = combo.reduce((acc, value) => acc + value)
    if (sum === targetSum) {
      allCombinations.push(combo)
      if (combo.length < minLength) minLength = combo.length
    }
  })
}

// fist part
console.log(`Total combinations: ${allCombinations.length}`)

// second part
console.log(`Min combination length: ${minLength}`)
console.log(
  `Combinations of min length: ${allCombinations.filter(val => val.length === minLength).length}`
)
