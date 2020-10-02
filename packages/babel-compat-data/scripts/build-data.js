"use strict";

const path = require("path");
const compatData = require("mdn-browser-compat-data").javascript;
const { process } = require("./build-modules-support");
const { generateData, environments, writeFile } = require("./utils-build-data");

const newData = generateData(environments, require("./data/plugin-features"));
// add export-namespace-from from mdn-browser-compat-data
const exportNamespaceFromCompatData = process(
  compatData.statements.export.namespace
);
// the node.js compat data is 12.0, the first node version ships `export *` behind a flag
// here we overwrite to 13.2 which is the first unflagged version
exportNamespaceFromCompatData.node = "13.2";
newData["proposal-export-namespace-from"] = exportNamespaceFromCompatData;

const dataPath = path.join(__dirname, "../data/plugins.json");

if (!writeFile(newData, dataPath, "plugin")) {
  process.exitCode = 1;
}
