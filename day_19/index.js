const { readFileSync } = require('fs')
const { join } = require('path')

const contents = readFileSync(join(__dirname, 'input.txt'), 'utf8')

const transormPattern = /(?<from>\w+) => (?<to>\w+)\n/g
const transforms = new Map()
for (let { groups } of contents.matchAll(transormPattern)) {
  if (!transforms.has(groups.from)) {
    transforms.set(groups.from, [groups.to])
  } else {
    transforms.get(groups.from).push(groups.to)
  }
}

const molecule = contents.match(/\n(?<molecule>\w+)\n$/).groups.molecule
const transormedMolecules = new Set()

for (let element of transforms.keys()) {
  for (let match of molecule.matchAll(new RegExp(element, 'g'))) {
    for (let replacement of transforms.get(element)) {
      transormedMolecules.add(
        molecule.slice(0, match.index) +
        replacement +
        molecule.slice(match.index + element.length)
      )
    }
  }
}

console.log(transormedMolecules.size)
