import fs from "fs";
import path from "path";

const cwd = process.cwd();
const packageJSONPath = path.resolve(cwd, "./package.json");
const content = JSON.parse(fs.readFileSync(packageJSONPath));

let bumped = false;
function bumpBabelDependency(type, version) {
  const dependencies = content[type];
  for (const dep of Object.keys(dependencies)) {
    if (dep.startsWith("@babel/") && !dependencies[dep].includes(":")) {
      dependencies[dep] = version;
      console.log(`Bumped ${type}:${dep} to ${version}`);
      bumped = true;
    }
  }
}

if ("peerDependencies" in content) {
  bumpBabelDependency("peerDependencies", "*");
}
if ("devDependencies" in content) {
  bumpBabelDependency("devDependencies", "latest");
}
if ("dependencies" in content) {
  bumpBabelDependency("dependencies", "latest");
}

if (bumped) {
  fs.writeFileSync(packageJSONPath, JSON.stringify(content, undefined, 2));
}
