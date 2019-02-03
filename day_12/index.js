const { readFile } = require('fs').promises
const path = require('path')

const arrayDepth = 99

function calcValue (obj) {
  let sum = 0
  for (let value of Object.values(obj)) {
    if (typeof value === 'string') {
      if (value === 'red') {
        sum = 0
        break
      } else {
        continue
      }
    } else if (typeof value === 'number') {
      sum += value
    } else if (value instanceof Array) {
      const arr = value.flat(arrayDepth)
      sum += arr.reduce((acc, value) => {
        if (typeof value === 'number') {
          return acc + value
        } else if (value instanceof Object) {
          return acc + calcValue(value)
        } else {
          return acc
        }
      }, 0)
    } else {
      sum += calcValue(value)
    }
  }
  return sum
}

readFile(path.join(__dirname, 'input.txt'), 'utf8').then(contents => {
  const obj = JSON.parse(contents)
  console.log(calcValue(obj))
})
