#!/usr/bin/env node

// Usage:
// babel-compile-async-parallel.js [filename]
import { transformAsync } from "../../lib/index.js";

(async () => {
  process.stdout.write(JSON.stringify(await Promise.all([
    transformAsync(""),
    transformAsync("")
  ])));
})();
