#!/usr/bin/env node

// Usage:
// babel-compile-async.js [filename]
import babel from "../../lib/index.js";

process.stdout.write(
  JSON.stringify(babel.transformSync(""))
);
