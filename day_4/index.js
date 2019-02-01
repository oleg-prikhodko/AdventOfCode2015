const crypto = require("crypto");

function* sequence() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

const key = process.argv[2];
const numberOfZeros = process.argv[3]
if (!key || !numberOfZeros) {
  console.log("Key and number of zeros arguments required");
  process.exit(1);
}

const zeros = "0".repeat(numberOfZeros)

for (let number of sequence()) {
  const hash = crypto.createHash("md5");
  hash.update(key + number);
  const digest = hash.digest("hex").slice(0, numberOfZeros);
  if (digest === zeros) {
    console.log(number);
    break;
  }
}
