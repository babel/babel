"use strict";

const fs = require("fs").promises;
const path = require("path");
const semver = require("semver");

console.log(path.resolve(__dirname, "../data/corejs3-built-ins.json"));

async function buildModulesByVersion() {
  const raw = await fs.readFile(
    require.resolve("core-js-compat/modules-by-versions")
  );
  const data = JSON.parse(raw);

  // JSON objects are not guaranteed to be sorted. Also, having an array
  // with already coerced corejs versions makes it easier to use these data.
  const result = Object.keys(data)
    .sort((a, b) => semver.compare(semver.coerce(a), semver.coerce(b)))
    .map(version => ({
      version: semver.coerce(version).version,
      modules: data[version],
    }));

  await fs.writeFile(
    path.resolve(__dirname, "../data/corejs3-modules-by-version.json"),
    JSON.stringify(result, null, 2)
  );
}

Promise.all([
  fs.copyFile(
    require.resolve("core-js-compat/data"),
    path.resolve(__dirname, "../data/corejs3-built-ins.json")
  ),
  fs.copyFile(
    require.resolve("core-js-compat/entries"),
    path.resolve(__dirname, "../data/corejs3-entries.json")
  ),
  buildModulesByVersion(),
]);
