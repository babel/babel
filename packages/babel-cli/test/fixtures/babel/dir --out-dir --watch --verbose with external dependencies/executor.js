const fs = require("fs");
const assert = require("assert");

// For Node.js <= 10
if (!assert.match) assert.match = (val, re) => assert(re.test(val));

const run = (function* () {
  let files = [yield, yield].sort();
  assert.match(files[0], /src[\\/]index.js -> lib[\\/]index.js/);
  assert.match(files[1], /src[\\/]main.js -> lib[\\/]main.js/);
  assert.match(yield, /Successfully compiled 2 files with Babel \(\d+ms\)\./);

  logFile("lib/index.js");
  logFile("lib/main.js");

  fs.writeFileSync("./file.txt", "Updated!");

  files = [yield, yield].sort();
  assert.match(files[0], /src[\\/]index.js -> lib[\\/]index.js/);
  assert.match(files[1], /src[\\/]main.js -> lib[\\/]main.js/);
  assert.match(yield, /Successfully compiled 2 files with Babel \(\d+ms\)\./);

  logFile("lib/index.js");
  logFile("lib/main.js");
})();

run.next();

const batchedStrings = [];
let batchId = 0;

process.stdin.on("data", function listener(chunk) {
  const str = String(chunk).trim();
  if (!str) return;

  if (str.startsWith("src")) {
    batchedStrings.push(str);
  } else {
    // "src/index.js -> lib/index.js"-like strings don't always come in order,
    // so we need to collect and sort them before logging.
    if (batchedStrings.length > 0) {
      batchedStrings.sort();
      for (const str of batchedStrings) {
        console.log(`BATCHED(${batchId})`, str);
      }
      batchId++;
      batchedStrings.length = 0;
    }

    console.log(str);
  }

  if (run.next(str).done) {
    process.exit(0);
  }
});

function logFile(file) {
  console.log("EXECUTOR", file, JSON.stringify(fs.readFileSync(file, "utf8")));
}

setTimeout(() => {
  console.error("EXECUTOR TIMEOUT");
  process.exit(1);
}, 5000);
