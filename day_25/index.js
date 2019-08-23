const TARGET_ROW = 2980
const TARGET_COLUMN = 3074

const codeTable = []
let row = 0
let column = 0
let maxRow = 0
let lastCode = null

function generateCode (prevCode) {
  if (!prevCode) return 20151125
  else return (prevCode * 252533) % 33554393
}

function fillTable (code) {
  if (!codeTable[row]) codeTable[row] = []
  codeTable[row][column] = code
  if (row === 0) {
    maxRow++
    row = maxRow
    column = 0
  } else {
    column++
    row--
  }
}

function shouldContinue () {
  if (row > TARGET_ROW && column > TARGET_COLUMN) return false
  return true
}

while (shouldContinue()) {
  lastCode = generateCode(lastCode)
  fillTable(lastCode)
}

console.log(codeTable[TARGET_ROW][TARGET_COLUMN])
