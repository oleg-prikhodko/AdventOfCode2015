const { readFileSync } = require('fs')
const { join } = require('path')

class Reindeer {
  constructor (name, speed, travel, rest) {
    this.name = name
    this.speed = speed
    this.travel = travel
    this.rest = rest

    this.cycle = this.travel + this.rest
    this.distancePerCycle = this.travel * this.speed

    this.points = 0
  }
  tick (time) {
    const fullCycles = Math.floor(time / this.cycle)
    let distance = fullCycles * this.distancePerCycle
    let unfinishedCycle = time - fullCycles * this.cycle
    distance += unfinishedCycle >= this.travel
      ? this.distancePerCycle
      : (unfinishedCycle % this.travel) * this.speed
    this.distance = distance
  }
}

const contents = readFileSync(join(__dirname, 'input.txt'), 'utf8').trim()
const reindeers = contents.split('\n').map(line => {
  const [_, name, speed, travel, rest] = /(\w+) .+ (\d{1,2}) .+ (\d{1,2}) .+ (\d{2,3})/.exec(line)
  return new Reindeer(name, parseInt(speed), parseInt(travel), parseInt(rest))
})

const sortByDistance = (a, b) => b.distance - a.distance
const sortByPoints = (a, b) => b.points - a.points

const limit = 2503
let time = 1

while (time <= limit) {
  reindeers.forEach(deer => deer.tick(time))
  reindeers.sort(sortByDistance)
  const leaders = reindeers.filter(deer => deer.distance === reindeers[0].distance)
  leaders.forEach(deer => deer.points++)
  time++
}

console.log('Part one', reindeers[0].distance)
reindeers.sort(sortByPoints)
console.log('Part two', reindeers[0].points)
