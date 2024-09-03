// NOTE: This file must be runnable on all Node.js version

const cp = require("child_process");
const fs = require("fs");
const path = require("path");

const flags = require("../data/node-flags-with-value.json");
const knownFlagsSet = new Set(flags);

function push(flag) {
  if (knownFlagsSet.has(flag)) return;

  if (!process.argv.includes("--update")) {
    throw new Error(
      `Missing flag "${flag}" from Node.js ${process.version} in ./packages/babel-node/data/node-flags-with-value.json.\n` +
        `Run node ./packages/babel-node/scripts/list-node-flags.js --update to update it.`
    );
  }

  flags.push(flag);
}

const out = cp.execSync(`${process.execPath} --help`).toString();
const re = /(?:(-\w), )?(--[\w-]+)\[?(?:=| \[)/g;
for (let res; (res = re.exec(out)); ) {
  if (res[1]) push(res[1]);
  push(res[2]);
}

if (flags.length !== knownFlagsSet.size) {
  flags.sort();
  fs.writeFileSync(
    path.join(__dirname, "..", "data", "node-flags-with-value.json"),
    JSON.stringify(flags, null, 2) + "\n"
  );
}
