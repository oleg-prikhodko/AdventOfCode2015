const { readFile } = require("fs").promises;
const path = require("path");

const comparator = (a, b) => a - b;
const multiply = (product, value) => product * value;

function boxFromLine(line) {
  return new Box(...line.split("x").map(value => parseInt(value)));
}

class Box {
  constructor(length, width, height) {
    this.length = length;
    this.width = width;
    this.height = height;
  }
  get dimensions() {
    return [this.length, this.width, this.height];
  }
  totalArea() {
    const surfaceArea =
      2 *
      (this.length * this.width +
        this.width * this.height +
        this.height * this.length);
    const smallestSideArea = this.dimensions
      .sort(comparator)
      .slice(0, 2)
      .reduce(multiply);
    return surfaceArea + smallestSideArea;
  }
  ribbonLength() {
    const [side1, side2] = this.dimensions.sort(comparator).slice(0, 2);
    const shortestPerimeter = 2 * (side1 + side2);
    const volume = this.dimensions.reduce(multiply);
    return shortestPerimeter + volume;
  }
}

readFile(path.join(__dirname, "input.txt"), "utf8")
  .then(contents => {
    const boxes = contents
      .trim()
      .split("\n")
      .map(line => boxFromLine(line));
    let totalPaperArea = 0;
    let totalRibbonLength = 0;
    for (let box of boxes) {
      totalPaperArea += box.totalArea();
      totalRibbonLength += box.ribbonLength();
    }
    console.log(totalPaperArea, totalRibbonLength);
  })
  .catch(err => console.log(err));
