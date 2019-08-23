function convertToCodePoints (str) {
  return Array.from(str, char => char.codePointAt(0))
}

function convertToString (codePoints) {
  return codePoints.map(point => String.fromCodePoint(point)).join('')
}

function firstRule (password) {
  password = password.slice()
  while (password.length >= 3) {
    const [a, b, c] = password
    if (c === b + 1 && b === a + 1) return true
    password = password.slice(1)
  }
  return false
}

function secondRule (password) {
  const chars = convertToCodePoints('iol')
  return (
    !password.includes(chars[0]) &&
    !password.includes(chars[1]) &&
    !password.includes(chars[2])
  )
}

function thirdRule (password) {
  password = password.slice()
  let duplicateCount = 0
  let lastDuplicate = null
  while (password.length >= 2 && duplicateCount < 2) {
    const [a, b] = password
    if (a === b && a !== lastDuplicate) {
      duplicateCount++
      lastDuplicate = a
    }
    password = password.slice(1)
  }
  return duplicateCount >= 2
}

function * generate (initial) {
  const offset = 97
  const radix = 26
  let int = initial.slice().reverse()
    .map((c, i) => c - offset)
    .map((c, i) => c * (radix ** i))
    .reduce((acc, val) => acc + val)

  while (true) {
    int++
    const codePoints = int.toString(radix)
      .split('')
      .map(c => parseInt(c, radix) + offset)
    yield codePoints
  }
}

function generatePassword (initial) {
  for (const p of generate(convertToCodePoints(initial))) {
    if (firstRule(p) && secondRule(p) && thirdRule(p)) {
      return convertToString(p)
    }
  }
}

const firstPass = generatePassword('hxbxwxba')
console.log(firstPass)
const secondPass = generatePassword(firstPass)
console.log(secondPass)
