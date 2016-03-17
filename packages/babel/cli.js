#!/usr/bin/env node

console.error("You have mistakenly installed the `babel` package, which is a no-op in Babel 6.\n" +
  "Babel's CLI commands have been moved from the `babel` package to the `babel-cli` package.\n" +
  "\n" +
  "    npm uninstall babel\n" +
  "    npm install babel-cli\n" +
  "\n" +
  "See http://babeljs.io/docs/usage/cli/ for setup instructions.");
process.exit(1);
