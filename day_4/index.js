const crypto = require("crypto");

function* sequence() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

const key = process.argv[2];
if (!key) {
  console.log("Key is required");
  process.exit(1);
}

for (let number of sequence()) {
  const hash = crypto.createHash("md5");
  hash.update(key + number);
  const digest = hash.digest("hex").slice(0, 5);
  if (digest === "000000") {
    console.log(number);
    break;
  }
}
