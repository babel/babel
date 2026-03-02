#!/usr/bin/env node

// Usage:
// babel-compile-async.js [filename]
import babel from "../../lib/index.js";

(async () => {
  process.stdout.write(
    JSON.stringify(await babel.transformAsync(""))
  );
})();
