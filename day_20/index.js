const { range } = require('../utils')

const targetPresents = 33100000
const limit = targetPresents / 10

function hasSufficientPresents (presents) {
  return presents >= targetPresents
}

function findHouse (presentsPerHouse, maxHouses = limit) {
  const presentsByHouse = Array(limit).fill(10)

  for (const elf of range(2, limit)) {
    const houseLimit = Math.min(maxHouses * elf, limit)
    for (const house of range(elf, houseLimit + 1, elf)) {
      presentsByHouse[house - 1] += elf * presentsPerHouse
    }
  }

  const houseIdx = presentsByHouse.findIndex(hasSufficientPresents)
  return [houseIdx + 1, presentsByHouse[houseIdx]]
}

console.log(findHouse(10))
console.log(findHouse(11, 50))
