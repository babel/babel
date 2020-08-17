#!/usr/bin/env node

// Usage:
// babel-load-options-async.js [filename]
import babel from "@babel/core";

const [, , filename, cwd] = process.argv;

(async () => {
  process.stdout.write(
    JSON.stringify(await babel.loadOptionsAsync({ filename, cwd }))
  );
})();
