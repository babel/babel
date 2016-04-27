import chalk from "chalk";
import path from "path";
import fs from "fs";
import * as rules from "./rules";
import symbols from "log-symbols";

let didError = false;
let lastWasSep = false;

function sep() {
  if (lastWasSep) return;
  lastWasSep = true;

  console.log();
}

function log(msg) {
  lastWasSep = false;
  console.log(msg);
}

//

log("\n" + chalk.underline.yellow("Babel Doctor"));
log("Running sanity checks on your system. This may take a few minutes...\n");

//

let packages = [];

let nodeModulesDirectories = [
  path.join(process.cwd(), "node_modules")
];

while (nodeModulesDirectories.length) {
  let loc = nodeModulesDirectories.shift();
  if (!fs.existsSync(loc)) continue;

  let packagesNames = fs.readdirSync(loc);

  for (let packageName of (packagesNames: Array<string>)) {
    if (packageName[0] === ".") continue;

    let packageLoc = path.join(loc, packageName);
    let packageJsonLoc = path.join(packageLoc, "package.json");
    if (!fs.existsSync(packageJsonLoc)) continue;

    packages.push({
      name: packageName,
      loc: packageLoc,
      version: require(packageJsonLoc).version
    });

    nodeModulesDirectories.push(path.join(packageLoc, "node_modules"));
  }
}

//

async function run() {
  let promises = [];

  for (let key in rules) {
    if (key[0] === "_") continue;

    let fn = rules[key];
    promises.push(fn(packages));
  }

  let results = await Promise.all(promises);

  for (let [success, message] of (results: Array)) {
    if (!success) didError = true;
    let multiline = message.indexOf("\n") >= 0;
    if (multiline) sep();
    log(`${success ? symbols.success : symbols.error} ${message}`);
    if (multiline) sep();
  }

  sep();

  if (didError) {
    log(chalk.red("Found potential issues on your machine :("));
  } else {
    log(chalk.green("Everything looks all right!"));
  }

  sep();
}

run().then(function () {
  process.exit(0);
}, function (err) {
  console.error(err.stack);
  process.exit(1);
});
