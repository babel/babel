"use strict";

const path = require("path");

const { generateData, environments, writeFile } = require("./utils-build-data");

for (const target of ["plugin", "corejs2-built-in"]) {
  const newData = generateData(
    environments,
    require(`./data/${target}-features`)
  );
  const dataPath = path.join(__dirname, `../data/${target}s.json`);

  if (!writeFile(newData, dataPath, target)) {
    process.exitCode = 1;
    break;
  }
}
