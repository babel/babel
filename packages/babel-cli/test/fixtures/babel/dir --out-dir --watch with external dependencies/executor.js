const fs = require("fs");

// Wait for the initial build
sleep(300);

logFile("lib/index.js");
logFile("lib/main.js");

fs.writeFileSync("./file.txt", "Updated!");

// Wait for the new build
sleep(300);

logFile("lib/index.js");
logFile("lib/main.js");

function logFile(file) {
  console.log("EXECUTOR", file, JSON.stringify(fs.readFileSync(file, "utf8")));
}

function sleep(ms) {
  const arr = new Int32Array(new SharedArrayBuffer(4));
  arr[0] = 0;
  Atomics.wait(arr, 0, 0, ms);
}
