import fs from "fs";
import content from "../../../package.json" with { type: "json" };

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
    new URL("../../../packages", import.meta.url)
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

const packageJSONPath = new URL("../../../package.json", import.meta.url);
fs.writeFileSync(packageJSONPath, JSON.stringify(content, undefined, 2));
