/**
 * This script runs via Lerna's "version" script execution from each
 * package that Babel builds caching metadata for.
 */
"use strict";

const fs = require("fs");
const buildCacheKey = require("./build-cache-key").buildCacheKey;

const pkgName = "./package.json";

const result = buildCacheKey(pkgName, fs.readFileSync("./package.json"));

fs.writeFileSync(result.name, result.content);
