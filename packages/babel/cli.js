#!/usr/bin/env node
const isGlobal = require("is-global");

const globalMessage = isGlobal() ? " -g" : "";

console.error("You have mistakenly installed the `babel` package, which is a no-op in Babel 6.\n" +
  "Babel's CLI commands have been moved from the `babel` package to the `babel-cli` package.\n" +
  "\n" +
  "    npm uninstall" + globalMessage + " babel-cli\n" +
  "    npm install --save-dev babel-cli\n" +
  "\n" +
  "See http://babeljs.io/docs/usage/cli/ for setup instructions.");
process.exit(1);
