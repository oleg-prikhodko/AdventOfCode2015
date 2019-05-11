const { readFileSync } = require('fs')
const { join } = require('path')

const steps = 100
const size = 100

function getIndex (row, col) {
  return row * size + col
}

function getRowCol (index) {
  const row = Math.floor(index / size)
  const col = index % size
  return [row, col]
}

function getNeighbours (row, col, grid) {
  const startRow = row - 1 < 0 ? row : row - 1
  const endRow = row + 1 >= size ? row : row + 1
  const startCol = col - 1 < 0 ? col : col - 1
  const endCol = col + 1 >= size ? col : col + 1
  const neighbours = []
  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      if (i === row && j === col) continue
      const index = getIndex(i, j)
      neighbours.push(grid[index])
    }
  }
  return neighbours
}

function isCorner (row, col) {
  return (
    (row === 0 && col === 0) ||
    (row === 0 && col === size - 1) ||
    (row === size - 1 && col === size - 1) ||
    (row === size - 1 && col === 0)
  )
}

function determineState (row, col, grid, part = 1) {
  if (part === 2 && isCorner(row, col)) return '#'

  const index = getIndex(row, col)
  const value = grid[index]
  const neighbours = getNeighbours(row, col, grid)
  const neighboursOn = neighbours.filter(value => value === '#').length
  let state = null
  if (value === '#') {
    state = neighboursOn === 2 || neighboursOn === 3 ? '#' : '.'
  } else {
    state = neighboursOn === 3 ? '#' : '.'
  }
  return state
}

const initialState = readFileSync(join(__dirname, 'input.txt'), 'utf8').replace(/\s/g, '')
const grid = Array.from(initialState)

let arr = grid
let step = 0

while (step < steps) {
  arr = arr.map((_, index) => determineState(...getRowCol(index), arr))
  step++
}

console.log(arr.filter(value => value === '#').length)
