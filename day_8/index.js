const { readFile } = require("fs").promises;
const path = require("path");

const escapePattern = /\\"|\\[^"]/g
const asciiPattern = /(\\x[0-9a-f]{2})/g
const openingQuotesCount = 2

function countStringChars(str) {
    let escapeCount = 0
    let asciiCount = 0
    if (escapePattern.test(str)) {
        escapeCount += str.match(escapePattern).length
    }
    if (asciiPattern.test(str)) {
        asciiCount += str.match(asciiPattern).length
    }
    const count = str.length - openingQuotesCount - escapeCount - asciiCount * 2
    return count
}

function encodeString(str) {
    let encoded = str.replace(/\\{2}/g, String.raw`\\\\`)
        .replace(/\\"(.+)/g, String.raw`\\\"$1`)
        .replace(asciiPattern, "\\$1")
        .replace(/^"|"$/g, '\\"')
    encoded = `"${encoded}"`
    return encoded
}

// const str = String.raw`"\"\\"`
// console.log(
//     str, encodeString(str)
// )

readFile(path.join(__dirname, "input.txt"), "utf8")
    .then(contents => {
        const strings = contents.trim().split("\n")
        const encodedStrings = strings.map(str => encodeString(str))

        const codeChars = strings.reduce((acc, str) => acc + str.length, 0)
        const stringChars = strings.reduce((acc, str) => acc + countStringChars(str), 0)
        console.log("Part one", codeChars - stringChars)

        const encodedCodeChars = encodedStrings.reduce((acc, str) => acc + str.length, 0)
        console.log("Part two", encodedCodeChars - codeChars)
    })

