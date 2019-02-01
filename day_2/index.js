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

// function surfaceArea(length, width, height) {
//   return 2 * (length * width + width * height + height * length);
// }

// function smallestSideArea(...dimensions) {
//   dimensions.sort(comparator);
//   return dimensions.slice(0, 2).reduce(multiply);
// }

// function totalArea(length, width, height) {
//   return (
//     surfaceArea(length, width, height) + smallestSideArea(length, width, height)
//   );
// }

// function shortestPerimeter(...dimensions) {
//   dimensions.sort(comparator);
//   const [side1, side2] = dimensions.slice(0, 2);
//   return 2 * (side1 + side2);
// }

// function volume(...dimensions) {
//   return dimensions.reduce(multiply);
// }

// function ribbonLength(length, width, height) {
//   return (
//     shortestPerimeter(length, width, height) + volume(length, width, height)
//   );
// }

readFile(path.join(__dirname, "input.txt"), "utf8")
  .then(contents => {
    const boxes = contents
      .trim()
      .split("\n")
      //   .map(line => line.split("x").map(value => parseInt(value)));
      .map(line => boxFromLine(line));

    let totalPaperArea = 0;
    let totalRibbonLength = 0;
    // for (let [length, width, height] of boxes) {
    for (let box of boxes) {
      //   totalPaperArea += totalArea(length, width, height);
      totalPaperArea += box.totalArea();
      //   totalRibbonLength += ribbonLength(length, width, height);
      totalRibbonLength += box.ribbonLength();
    }
    console.log(totalPaperArea, totalRibbonLength);
  })
  .catch(err => console.log(err));
