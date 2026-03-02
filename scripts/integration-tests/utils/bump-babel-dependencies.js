import fs from "fs";
import path from "path";

const cwd = process.cwd();
const packageJSONPath = path.resolve(cwd, "./package.json");
const content = JSON.parse(fs.readFileSync(packageJSONPath));

let bumped = false;
function bumpBabelDependency(dependencies, version) {
  for (const dep of Object.keys(dependencies)) {
    if (dep.startsWith("@babel/") && !dependencies[dep].includes(":")) {
      dependencies[dep] = version;
      bumped = true;
    }
  }
}

if ("peerDependencies" in content) {
  bumpBabelDependency(content.peerDependencies, "*");
}
if ("devDependencies" in content) {
  bumpBabelDependency(content.devDependencies, "latest");
}
if ("dependencies" in content) {
  bumpBabelDependency(content.dependencies, "latest");
}

if (bumped) {
  fs.writeFileSync(packageJSONPath, JSON.stringify(content, undefined, 2));
}
