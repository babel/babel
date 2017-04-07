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

  console.log("Setting up smoke test");
  fs.ensureDir(tempFolderPath);

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
    "babel-cli": "*",
    "babel-preset-env": "${packPath}"
  }
}
  `
  );

  fs.writeFileSync(
    path.join(tempFolderPath, ".babelrc"),
    `
{
  "presets": [
    ["env", {
      modules: false,
      useBuiltIns: true
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

  process.chdir(tempFolderPath);

  console.log("Running smoke test");
  execSync("npm install && npm run build");
} catch (e) {
  console.log(e);
  errorOccurred = true;
}

console.log("Cleaning up");
fs.removeSync(tempFolderPath);
fs.removeSync(packPath);

process.exit(errorOccurred ? 1 : 0);
