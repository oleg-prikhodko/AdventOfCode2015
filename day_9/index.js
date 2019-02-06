const { readFileSync } = require('fs')
const { join } = require('path')

function * range (start, limit) {
  let counter = start
  while (counter < limit) yield counter++
}

function swap (arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function * permute (arr, left = 0, right = arr.length - 1) {
  arr = [...arr]
  if (left === right) yield arr
  for (let i of range(left, right + 1)) {
    swap(arr, left, i)
    yield * permute(arr, left + 1, right)
    swap(arr, left, i)
  }
}

function * pairs (arr) {
  let index = 0
  while (index < arr.length - 1) {
    yield arr.slice(index, index + 2).join(' ')
    index++
  }
}

const contents = readFileSync(join(__dirname, 'input.txt'), 'utf8').trim()
const edges = new Map()
const locations = new Set()
contents.split('\n').forEach(line => {
  const [_, from, to, distance] = /(\w+) to (\w+) = (\d+)/.exec(line)
  locations.add(from)
  locations.add(to)
  edges.set(`${from} ${to}`, parseInt(distance))
  edges.set(`${to} ${from}`, parseInt(distance))
})

const permutations = [...permute(Array.from(locations))]
const distances = permutations.map(permutation => {
  const route = [...pairs(permutation)]
  return route.reduce((distance, edge) => distance + edges.get(edge), 0)
})

console.log('Part one:', Math.min(...distances))
console.log('Part two:', Math.max(...distances))
