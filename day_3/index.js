const { readFile } = require("fs").promises;
const path = require("path");

class Counter extends Map {
  set(value) {
    if (this.has(value)) {
      super.set(value, this.get(value) + 1);
    } else {
      super.set(value, 1);
    }
  }
  mostCommon(limit) {
    const entries = Array.from(this.entries());
    entries.sort(([a, aCount], [b, bCount]) => bCount - aCount);
    if (limit) return entries.slice(0, limit);
    return entries;
  }
}

function walk(contents, counter, startPosition) {
  const currentPosition = { ...startPosition };
  for (let char of contents) {
    switch (char) {
      case "^":
        currentPosition.y++;
        break;
      case ">":
        currentPosition.x++;
        break;
      case "v":
        currentPosition.y--;
        break;
      case "<":
        currentPosition.x--;
        break;
      default:
        break;
    }
    counter.set(JSON.stringify(currentPosition));
  }
}

readFile(path.join(__dirname, "input.txt"), "utf8")
  .then(contents => {
    contents = Array.from(contents.trim());
    const evenChars = contents.filter((_, index) => index % 2 === 0);
    const oddChars = contents.filter((_, index) => index % 2 === 1);
    const counter = new Counter();
    const startPosition = { x: 0, y: 0 };
    counter.set(JSON.stringify(startPosition));
    // walk(contents, counter, startPosition);
    walk(evenChars, counter, startPosition);
    walk(oddChars, counter, startPosition);
    console.log(counter.mostCommon().length);
  })
  .catch(err => console.log(err));
