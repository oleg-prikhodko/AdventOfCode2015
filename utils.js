/**
 * Generate range of numbers
 * @param {number} start From
 * @param {number} limit To
 * @example
 * console.log([...range(0,3)]) // [ 0, 1, 2 ]
 */
function * range (start, limit) {
  let counter = start
  while (counter < limit) yield counter++
}

function swap (arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/**
 * Generate all possible permutations
 * @param {*[]} arr Input array
 * @param {number} left Left index
 * @param {number} right Right index
 * @example
 * console.log([...permute([1,2])]) // [ [ 1, 2 ], [ 2, 1 ] ]
 */
function * permute (arr, left = 0, right = arr.length - 1) {
  arr = [...arr]
  if (left === right) yield arr
  for (let i of range(left, right + 1)) {
    swap(arr, left, i)
    yield * permute(arr, left + 1, right)
    swap(arr, left, i)
  }
}

/**
 * Generate sequential pairs as a string
 * @param {*[]} arr Input array
 * @example
 * console.log([...pairs([1,2,3,4])]) // [ '1 2', '2 3', '3 4' ]
 */
function * pairs (arr) {
  let index = 0
  while (index < arr.length - 1) {
    yield arr.slice(index, index + 2).join(' ')
    index++
  }
}

module.exports = { range, permute, pairs }
