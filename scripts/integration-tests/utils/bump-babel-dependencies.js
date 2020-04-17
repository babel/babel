const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const packageJSONPath = path.resolve(cwd, "./package.json");
const content = JSON.parse(fs.readFileSync(packageJSONPath));

let bumped = false;
function bumpBabelDependency(dependencies) {
  for (const dep of Object.keys(dependencies)) {
    if (dep.startsWith("@babel/")) {
      dependencies[dep] = "latest";
      bumped = true;
    }
  }
}

if ("peerDependencies" in content) {
  bumpBabelDependency(content.peerDependencies);
}
if ("devDependencies" in content) {
  bumpBabelDependency(content.devDependencies);
}
if ("dependencies" in content) {
  bumpBabelDependency(content.dependencies);
}

if (bumped) {
  fs.writeFileSync(packageJSONPath, JSON.stringify(content, undefined, 2));
}
