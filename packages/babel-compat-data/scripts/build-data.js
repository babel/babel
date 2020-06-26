"use strict";

const path = require("path");

const { generateData, environments, writeFile } = require("./utils-build-data");

const newData = generateData(environments, require("./data/plugin-features"));
const dataPath = path.join(__dirname, "../data/plugins.json");

if (!writeFile(newData, dataPath, "plugin")) {
  process.exitCode = 1;
}
