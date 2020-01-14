"use strict";

const fs = require("fs");
const overlappingPlugins = require("./data/overlapping-plugins");

fs.writeFileSync(
  __dirname + "/../data/overlapping-plugins.json",
  JSON.stringify(overlappingPlugins, replacer, 2)
);

function replacer(key, val) {
  if (val instanceof Set) return Array.from(val);
  if (val instanceof Map) return Object.fromEntries(val);
  return val;
}
