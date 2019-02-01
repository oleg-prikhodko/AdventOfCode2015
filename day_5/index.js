const { readFile } = require("fs").promises;
const { join } = require("path");

function hasThreeVowels(str) {
  return /([aeiou].*){3}/.test(str);
}

function hasDoubleLetter(str) {
  return /(.)\1/.test(str);
}

function doesNotContainSpecified(str) {
  return !/ab|cd|pq|xy/.test(str);
}

function conditionsMet(str) {
  return (
    hasThreeVowels(str) && hasDoubleLetter(str) && doesNotContainSpecified(str)
  );
}

readFile(join(__dirname, "input.txt"), "utf8")
  .then(contents => {
    const strings = contents.trim().split("\n");
    const niceStringCount = strings.filter(str => conditionsMet(str)).length;
    console.log(niceStringCount);
  })
  .catch(err => console.log(err));
