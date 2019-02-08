const { readFile } = require('fs').promises
const path = require('path')

readFile(path.join(__dirname, 'input.txt'), 'utf8')
  .then(contents => {
    //  part 1
    const upFloors = contents.match(/\(/g).length
    const downFloors = contents.match(/\)/g).length
    console.log(upFloors - downFloors)
    //  part 2
    let floor = 0
    for (let [index, char] of Array.from(contents).entries()) {
      if (char === '(') {
        floor++
      } else if (char === ')') {
        floor--
      }
      if (floor === -1) {
        console.log(index + 1)
        break
      }
    }
  })
  .catch(err => console.log(err))
