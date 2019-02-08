const { readFile } = require('fs').promises
const { join } = require('path')

function hasThreeVowels (str) {
  return /([aeiou].*){3}/.test(str)
}

function hasDoubleLetter (str) {
  return /(.)\1/.test(str)
}

function doesNotContainSpecified (str) {
  return !/ab|cd|pq|xy/.test(str)
}

function conditionsMetForPartOne (str) {
  return (
    hasThreeVowels(str) && hasDoubleLetter(str) && doesNotContainSpecified(str)
  )
}

function hasPair (str) {
  return /(.{2}).*\1/.test(str)
}

function hasLetterBetween (str) {
  return /(.).{1}\1/.test(str)
}

function conditionsMetForPartTwo (str) {
  return hasPair(str) && hasLetterBetween(str)
}

readFile(join(__dirname, 'input.txt'), 'utf8')
  .then(contents => {
    const strings = contents.trim().split('\n')
    let niceStringCount = strings.filter(str => conditionsMetForPartOne(str)).length
    console.log(niceStringCount)
    niceStringCount = strings.filter(str => conditionsMetForPartTwo(str)).length
    console.log(niceStringCount)
  })
  .catch(err => console.log(err))
