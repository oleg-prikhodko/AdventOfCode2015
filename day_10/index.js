function makeSequence (seq, runs) {
  let lastDigit = null
  let repeats = 0
  let newSeq = ''
  for (let digit of seq) {
    if (digit !== lastDigit) {
      if (lastDigit) {
        newSeq += repeats
        newSeq += lastDigit
      }
      lastDigit = digit
      repeats = 1
    } else {
      repeats++
    }
  }
  newSeq += repeats
  newSeq += lastDigit

  if (runs === 1) {
    return newSeq
  } else {
    return process(newSeq, runs - 1)
  }
}

const sequence = process.argv[2]
const runs = process.argv[3] ? process.argv[3] : 1
if (!sequence) {
  console.log('Sequence arg is missing')
  process.exit(1)
}

console.log(makeSequence(sequence, runs).length)
