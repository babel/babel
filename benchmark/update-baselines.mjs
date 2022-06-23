import path from "path";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageFilePath = path.join(__dirname, "package.json");
const packageFile = readFileSync(packageFilePath, "utf8");
const packageFileObj = JSON.parse(packageFile);

for (const name of Object.keys(packageFileObj.devDependencies)) {
  const resolution = packageFileObj.devDependencies[name];
  const version = resolution.substring(resolution.lastIndexOf("@") + 1);
  if (!name.startsWith("@babel-baseline/")) continue;
  const lastVersion = JSON.parse(
    readFileSync(
      path.join(
        __dirname,
        "../packages",
        name.replace("@babel-baseline/", "babel-"),
        "package.json"
      )
    )
  ).version;
  if (version !== lastVersion) {
    console.log(`Updating ${name} ${version} -> ${lastVersion}`);
    packageFileObj.devDependencies[name] =
      resolution.substring(0, resolution.lastIndexOf("@")) + "@" + lastVersion;
  }
}

const newFile = JSON.stringify(packageFileObj, null, 2) + "\n";
if (packageFile !== newFile) {
  writeFileSync(packageFilePath, newFile, "utf8");
  console.log("Please run `yarn` to apply changes.");
}
