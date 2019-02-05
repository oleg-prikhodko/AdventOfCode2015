const {readFileSync} = require('fs')
const {join} = require('path')

class Reindeer {
    constructor(name, speed, travel, rest) {
        this.name = name
        this.speed = speed
        this.travel = travel
        this.rest = rest

        this.cycle = this.travel + this.rest
        this.distancePerCycle = this.travel * this.speed
    }
    tick(time) {
        const fullCycles = Math.floor(time / this.cycle)
        let distance = fullCycles * this.distancePerCycle
        let unfinishedCycle = time - fullCycles * this.cycle
        distance += unfinishedCycle >= this.travel 
            ? this.distancePerCycle
            : (unfinishedCycle % this.travel) * this.speed
        this.distance = distance
    }
}

const contents = readFileSync(join(__dirname, "input.txt"), "utf8").trim()
const reindeers = contents.split("\n").map(line => {
    const [_, name, speed, travel, rest] = /(\w+) .+ (\d{1,2}) .+ (\d{1,2}) .+ (\d{2,3})/.exec(line)
    return new Reindeer(name, parseInt(speed), parseInt(travel), parseInt(rest))
})

const limit = 2503

reindeers.forEach(deer => deer.tick(limit))
reindeers.sort((a, b) => b.distance - a.distance)
console.log(reindeers[0].distance)
