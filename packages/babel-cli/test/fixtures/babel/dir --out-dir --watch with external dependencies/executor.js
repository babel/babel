const fs = require("fs");
const assert = require("assert");
const readline = require("readline");

// For Node.js <= 10
if (!assert.match) assert.match = (val, re) => assert(re.test(val));

const run = (async function* () {
  assert.match(yield, /Successfully compiled 2 files with Babel \(\d+ms\)\./);

  assert.equal(yield, "The watcher is ready.");

  logFile("lib/index.js");
  logFile("lib/main.js");

  fs.writeFileSync("./file.txt", "Updated!");

  assert.match(yield, /Successfully compiled 2 files with Babel \(\d+ms\)\./);

  logFile("lib/index.js");
  logFile("lib/main.js");
})();

run.next();

const rl = readline.createInterface(process.stdin);

rl.on("line", async function listener(str) {
  if (!str) return;

  console.log(str);

  if ((await run.next(str)).done) {
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
