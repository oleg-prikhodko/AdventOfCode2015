const { readFile } = require('fs').promises
const { range } = require('../utils')
const path = require('path')

const SIZE = 1000

class LightArray extends Array {
  getLightBlock (rowStart, colStart, rowEnd, colEnd) {
    const selected = []
    for (let row of range(rowStart, rowEnd + 1)) {
      for (let col of range(colStart, colEnd + 1)) {
        selected.push(this[row][col])
      }
    }
    return selected
  }
}

function Light () {
  this.on = false
  this.brightness = 0
}
Light.prototype.toggle = function () {
  this.on = !this.on
  this.brightness += 2
}
Light.prototype.turnOn = function () {
  this.on = true
  this.brightness++
}
Light.prototype.turnOff = function () {
  this.on = false
  if (this.brightness > 0) this.brightness--
}

readFile(path.join(__dirname, 'input.txt'), 'utf8').then(contents => {
  const instructions = contents.trim().split('\n')
  const lights = new LightArray()
  for (let row of range(0, SIZE)) {
    lights.push([])
    for (let _ of range(0, SIZE)) {
      lights[row].push(new Light())
    }
  }
  for (let instruction of instructions) {
    const [, command, start, end] = /([a-z ]+) (\d{1,3},\d{1,3}) (?:[a-z]+) (\d{1,3},\d{1,3})/.exec(instruction)
    const [rowStart, colStart] = start.split(',').map(value => parseInt(value))
    const [rowEnd, colEnd] = end.split(',').map(value => parseInt(value))
    const lightBlock = lights.getLightBlock(rowStart, colStart, rowEnd, colEnd)
    switch (command) {
      case 'turn on':
        lightBlock.forEach(light => light.turnOn())
        break
      case 'turn off':
        lightBlock.forEach(light => light.turnOff())
        break
      case 'toggle':
        lightBlock.forEach(light => light.toggle())
        break
      default:
        break
    }
  }
  console.log('First part:', lights.flat().filter(light => light.on).length)
  console.log('Second part:', lights.flat().reduce((acc, light) => acc + light.brightness, 0))
})
