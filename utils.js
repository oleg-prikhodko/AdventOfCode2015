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

module.exports = { range, swap, permute, pairs }
