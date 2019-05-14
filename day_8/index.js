const { readFile } = require('fs').promises
const path = require('path')
const assert = require('assert')

const escapePattern = /\\"|\\[^"]/g
const asciiPattern = /(\\x[0-9a-f]{2})/g
const openingQuotesCount = 2

function countMemChars (str) {
  let escapeCount = 0
  let asciiCount = 0
  if (escapePattern.test(str)) {
    escapeCount += str.match(escapePattern).length
  }
  if (asciiPattern.test(str)) {
    asciiCount += str.match(asciiPattern).length
  }
  const count = str.length - openingQuotesCount - escapeCount - asciiCount * 2
  return count
}

function encode (str) {
  const stringChars = []
  for (let char of str) {
    switch (char) {
      case '"':
        stringChars.push('\\"')
        break
      case '\\':
        stringChars.push('\\\\')
        break
      default:
        stringChars.push(char)
        break
    }
  }
  return `"${stringChars.join('')}"`
}

const strs = [
  String.raw`""`,
  String.raw`"abc"`,
  String.raw`"aaa\"aaa"`,
  String.raw`"\x27"`
]
const results = [
  String.raw`"\"\""`,
  String.raw`"\"abc\""`,
  String.raw`"\"aaa\\\"aaa\""`,
  String.raw`"\"\\x27\""`
]
strs.forEach((str, index) => assert.strictEqual(encode(str), results[index]))

readFile(path.join(__dirname, 'input.txt'), 'utf8')
  .then(contents => {
    const strings = contents.trim().split('\n')

    const lengthSum = (acc, str) => acc + str.length
    const codeChars = strings.reduce(lengthSum, 0)
    const memChars = strings.reduce((acc, str) => acc + countMemChars(str), 0)
    console.log('Part one:', codeChars - memChars)

    const encodedStrings = strings.map(str => encode(str))
    const encodedCodeChars = encodedStrings.reduce(lengthSum, 0)
    console.log('Part two:', encodedCodeChars - codeChars)
  })
