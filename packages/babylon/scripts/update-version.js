"use strict";
const fs = require("fs");

// Babylon inlines its own version into the built file, which means that
// since it is built before publishing, the inlined version does not match
// the version that Lerna updates to.

const target = "./lib/index.js";
const content = fs.readFileSync(target, "utf8");

const version = require("../package.json").version;

let foundVersion = 0;
const newContent = content.replace(/(var version = ")[^"]+(";)/g, function(
  s,
  prefix,
  suffix
) {
  foundVersion++;

  return prefix + version + suffix;
});

if (foundVersion !== 1) {
  throw new Error("Failed to find the verion to replace.");
}

fs.writeFileSync(target, newContent);
