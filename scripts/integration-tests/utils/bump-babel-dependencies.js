import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packageJSONPath = path.resolve(process.cwd(), "./package.json");
const content = JSON.parse(fs.readFileSync(packageJSONPath));

function bumpBabelDependency(type, version) {
  const dependencies = content[type];
  for (const dep of Object.keys(dependencies)) {
    if (dep.startsWith("@babel/") && !dependencies[dep].includes(":")) {
      dependencies[dep] = version;
      console.log(`Bumped ${type}:${dep} to ${version}`);
    }
  }
}

if (process.argv[2] === "resolutions") {
  const resolutions = content.resolutions || {};
  for (const name of fs.readdirSync(
    path.join(__dirname, "../../../packages")
  )) {
    if (!name.startsWith("babel-")) continue;
    resolutions[name.replace("babel-", "@babel/")] = "*";
  }
  content.resolutions = resolutions;
} else {
  if ("peerDependencies" in content) {
    bumpBabelDependency("peerDependencies", "*");
  }
  if ("devDependencies" in content) {
    bumpBabelDependency("devDependencies", "latest");
  }
  if ("dependencies" in content) {
    bumpBabelDependency("dependencies", "latest");
  }
}

fs.writeFileSync(packageJSONPath, JSON.stringify(content, undefined, 2));
