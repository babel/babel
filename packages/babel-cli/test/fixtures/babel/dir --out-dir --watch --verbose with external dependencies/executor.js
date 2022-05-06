const fs = require("fs");
const assert = require("assert");

// For Node.js <= 10
if (!assert.match) assert.match = (val, re) => assert(re.test(val));

const run = (async function* () {
  let files = [yield, yield].sort();
  assert.match(files[0], /src[\\/]index.js -> lib[\\/]index.js/);
  assert.match(files[1], /src[\\/]main.js -> lib[\\/]main.js/);
  assert.match(yield, /Successfully compiled 2 files with Babel \(\d+ms\)\./);

  logFile("lib/index.js");
  logFile("lib/main.js");
  // wait 2s for watcher setup
  await new Promise(resolve => setTimeout(resolve, 2000));
  fs.writeFileSync("./file.txt", "Updated!");

  // This test is flaky, sometimes `src/main.js` are not printed
  let firstLog = yield;
  if (firstLog.startsWith("Successfully")) {
    assert.match(
      firstLog,
      /Successfully compiled 2 files with Babel \(\d+ms\)\./
    );
  } else {
    [firstLog, secondLog, thirdLog] = [firstLog, yield, yield].sort();
    assert.match(
      firstLog,
      /Successfully compiled 2 files with Babel \(\d+ms\)\./
    );
    assert.match(secondLog, /src[\\/]index.js -> lib[\\/]index.js/);
    assert.match(thirdLog, /src[\\/]main.js -> lib[\\/]main.js/);
  }

  logFile("lib/index.js");
  logFile("lib/main.js");
})();

run.next();

const batchedStrings = [];
let batchId = 0;

process.stdin.on("data", async function listener(chunk) {
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

  if ((await run.next(str)).done) {
    process.exit(0);
  }
});

function logFile(file) {
  console.log("EXECUTOR", file, JSON.stringify(fs.readFileSync(file, "utf8")));
}

setTimeout(() => {
  // when the watcher takes longer than 2s to setup
  // write file again in 10 seconds
  fs.writeFileSync("./file.txt", "Updated!");
}, 10000);

setTimeout(() => {
  console.error("EXECUTOR TIMEOUT");
  process.exit(1);
}, 20000);
