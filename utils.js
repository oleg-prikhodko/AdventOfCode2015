/**
 * Generate range of numbers
 * @param {number} start From
 * @param {number} limit To
 * @example
 * console.log([...range(0,3)]) // [ 0, 1, 2 ]
 */
function * range (start, end, step = 1) {
  let counter = start
  while (counter < end) {
    yield counter
    counter += step
  }
}

function swap (arr, i, j) {
  const temp = arr[i]
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
  for (const i of range(left, right + 1)) {
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

/**
 * Returns all possible combinations of size 'k' from 'arr'
 * @param {*[]} arr Input array
 * @param {number} k Combination length
 * @return {*[]}
 * @example
 * console.log(combine([1,2,3],2)) // [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ]
 */
function combine (arr, k) {
  if (k === 1) return arr.map(comboOption => [comboOption])

  const combinations = []

  arr.forEach((currentElement, currentIndex) => {
    const smallerCombinations = combine(arr.slice(currentIndex + 1), k - 1)

    smallerCombinations.forEach(combination => {
      combinations.push([currentElement].concat(combination))
    })
  })

  return combinations
}

module.exports = { range, permute, pairs, combine }
