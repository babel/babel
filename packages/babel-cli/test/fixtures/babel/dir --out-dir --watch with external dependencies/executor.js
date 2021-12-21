const fs = require("fs");
const assert = require("assert");

// For Node.js <= 10
if (!assert.match) assert.match = (val, re) => assert(re.test(val));

const run = function* () {
  assert.match(yield, /Successfully compiled 2 files with Babel \(\d+ms\)\./);

  logFile("lib/index.js");
  logFile("lib/main.js");

  fs.writeFileSync("./file.txt", "Updated!");

  assert.match(yield, /Successfully compiled 2 files with Babel \(\d+ms\)\./);

  logFile("lib/index.js");
  logFile("lib/main.js");
}();

run.next();

process.stdin.on("data", function listener(chunk) {
  const str = String(chunk).trim();
  if (!str) return;

  console.log(str);

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
