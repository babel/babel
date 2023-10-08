import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packageJSONPath = path.resolve(process.cwd(), "./package.json");
const content = JSON.parse(fs.readFileSync(packageJSONPath));

const resolutions = content.resolutions || {};
for (const name of fs.readdirSync(path.join(__dirname, "../../../packages"))) {
  if (!name.startsWith("babel-")) continue;
  resolutions[name.replace("babel-", "@babel/")] = "*";
}
content.resolutions = resolutions;

fs.writeFileSync(packageJSONPath, JSON.stringify(content, undefined, 2));
