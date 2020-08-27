"use strict";

const path = require("path");

const { generateData, environments, writeFile } = require("./utils-build-data");

const newData = generateData(environments, require("./data/plugin-features"));
// add export-namespace-from from mdn-browser-compat-data
// todo: replace the hardcoded compat data to mdn-browser-compat-data
// after https://github.com/mdn/browser-compat-data/pull/6394 is published
newData["proposal-export-namespace-from"] = {
  chrome: "72",
  edge: "79",
  opera: "60",
  firefox: "80",
  node: "13.2",
  samsung: "11.0",
};

const dataPath = path.join(__dirname, "../data/plugins.json");

if (!writeFile(newData, dataPath, "plugin")) {
  process.exitCode = 1;
}
