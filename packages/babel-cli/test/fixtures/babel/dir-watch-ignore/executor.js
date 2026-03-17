const fs = require("fs");
const assert = require("assert");
const readline = require("readline");

if (!assert.match) assert.match = (val, re) => assert(re.test(val));

const run = (async function* () {
  const line1 = yield;
  if (!/Successfully compiled 1 file with Babel \(\d+ms\)\./.test(line1)) {
    process.exit(1);
  }

  const line2 = yield;
  if (line2 !== "The watcher is ready.") {
    process.exit(1);
  }

  // Update src/index.js - should trigger recompile
  fs.writeFileSync("./src/index.js", "export const a = 2;");
  const line3 = yield;
  if (!/Successfully compiled 1 file with Babel \(\d+ms\)\./.test(line3)) {
    process.exit(1);
  }

  // Update ignored/index.js - should NOT trigger recompile
  fs.writeFileSync("./ignored/index.js", "export const b = 3;");
  
  // Wait to ensure no more output comes from Babel.
  // If the fix works, chokidar won't notify Babel, and no output will be produced.
  await new Promise(resolve => setTimeout(resolve, 2000));

  // If we reached here without receiving more output from Babel, the test passes.
  process.exit(0);
})();

run.next();

const rl = readline.createInterface(process.stdin);

rl.on("line", async function listener(str) {
  if (!str) return;
  console.log(str); // Echo Babel output for test runner validation
  if ((await run.next(str)).done) {
    process.exit(0);
  }
});

setTimeout(() => {
  console.error("EXECUTOR TIMEOUT - This likely means Babel produced output when it shouldn't have or vice-versa");
  process.exit(1);
}, 15000);
