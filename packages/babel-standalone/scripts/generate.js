const pluginConfig = require("./pluginConfig.json");
const path = require("path");
const chalk = require("chalk");
const camelCase = require("lodash/camelCase");
const format = require("../../../scripts/utils/formatCode");
const writeFile = require("../../../scripts/utils/writeFileAndMkDir");

const outputFile = path.join(__dirname, "../src/generated/plugins.js");

console.log("Generating @babel/standalone files");

let imports = "";
let list = "";
let allList = "";

for (const plugin of pluginConfig.all) {
  const camelPlugin = camelCase(plugin);
  imports += `import ${camelPlugin} from "@babel/plugin-${plugin}";`;
  list += `${camelPlugin},`;
  allList += `"${plugin}": ${camelPlugin},`;
}

const fileContent = `// @flow
/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
${imports}

export {${list}};

export const all = {${allList}};
`;

writeFile(outputFile, format(fileContent, outputFile));
console.log(`  ${chalk.green("✔")} Generated plugin list`);
