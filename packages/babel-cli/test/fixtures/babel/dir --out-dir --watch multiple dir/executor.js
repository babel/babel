const fs = require("fs");
const assert = require("assert");
const readline = require("readline");

// For Node.js <= 10
if (!assert.match) assert.match = (val, re) => assert(re.test(val));

const run = (async function* () {
  assert.match(yield, /Successfully compiled 4 files with Babel \(\d+ms\)\./);

  assert.equal(yield, "The watcher is ready.");

  // update ./module1/src/index.js
  fs.writeFileSync(
    "./module1/src/index.js",
    `let str = REPLACE_ME + REPLACE_ME;`
  );

  assert.match(yield, /Successfully compiled 1 file with Babel \(\d+ms\)\./);
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

setTimeout(() => {
  console.error("EXECUTOR TIMEOUT");
  process.exit(1);
}, 5000);
