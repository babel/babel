#!/usr/bin/env node

import parseArgv from "./options";
import dirCommand from "./dir";
import fileCommand from "./file";

const opts = parseArgv(process.argv);

const fn = opts.cliOptions.outDir ? dirCommand : fileCommand;
fn(opts).catch(err => {
  console.error(err);
  process.exit(1);
});
