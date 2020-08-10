"use strict";

const path = require("path");

const { generateData, environments, writeFile } = require("./utils-build-data");

for (const target of ["plugin", "corejs2-built-in"]) {
  const newData = generateData(
    environments,
    require(`./data/${target}-features`)
  );
  if (target === "plugin") {
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
  }
  const dataPath = path.join(__dirname, `../data/${target}s.json`);

  if (!writeFile(newData, dataPath, target)) {
    process.exitCode = 1;
    break;
  }
}
