const { readFileSync } = require('fs')
const { join } = require('path')
const { permute, pairs } = require('../utils')

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
