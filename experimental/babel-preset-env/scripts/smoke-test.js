const fs = require("fs-extra");
const execSync = require("child_process").execSync;
const path = require("path");
const pkg = require("../package.json");

let errorOccurred = false;

const tempFolderPath = path.join(__dirname, "../tmp");
const packPath = path.join(__dirname, `../babel-preset-env-${pkg.version}.tgz`);

try {
  console.log("Creating package");
  execSync("npm pack");

  console.log("Setting up smoke test dependencies");

  fs.ensureDirSync(tempFolderPath);
  process.chdir(tempFolderPath);

  const babelCliVersion = pkg.devDependencies["babel-cli"];

  if (!babelCliVersion) {
    throw new Error("Could not read version of babel-cli from package.json");
  }

  fs.writeFileSync(
    path.join(tempFolderPath, "package.json"),
    `
{
  "name": "babel-preset-env-smoke-test",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "build": "babel index.js --out-file index.es6"
  },
  "dependencies": {
    "babel-cli": "${babelCliVersion}",
    "babel-preset-env": "${packPath}"
  }
}
`
  );

  execSync("npm install");

  console.log("Setting up 'usage' smoke test");

  fs.writeFileSync(
    path.join(tempFolderPath, ".babelrc"),
    `
{
  "presets": [
    ["env", {
      modules: false,
      useBuiltIns: "usage"
    }]
  ]
}
`
  );

  fs.writeFileSync(
    path.join(tempFolderPath, "index.js"),
    `
const foo = new Promise((resolve) => {
  resolve(new Map());
});
`
  );

  console.log("Running 'usage' smoke test");

  execSync("npm run build");

  console.log("Setting up 'entry' smoke test");

  fs.writeFileSync(
    path.join(tempFolderPath, ".babelrc"),
    `
{
  "presets": [
    ["env", {
      modules: false,
      useBuiltIns: "entry"
    }]
  ]
}
`
  );

  fs.writeFileSync(
    path.join(tempFolderPath, "index.js"),
    `
import "babel-polyfill";
1 ** 2;
`
  );

  console.log("Running 'entry' smoke test");

  execSync("npm run build");
} catch (e) {
  console.log(e);
  errorOccurred = true;
}

console.log("Cleaning up");
fs.removeSync(tempFolderPath);
fs.removeSync(packPath);

process.exit(errorOccurred ? 1 : 0);
