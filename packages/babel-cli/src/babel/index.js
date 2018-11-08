#!/usr/bin/env node

import parseArgv from "./options";
import dirCommand from "./dir";
import fileCommand from "./file";
import infoCommand from "./info";

const opts = parseArgv(process.argv);

const fn = opts.cliOptions.info
  ? infoCommand
  : opts.cliOptions.outDir
    ? dirCommand
    : fileCommand;

fn(opts).catch(err => {
  console.error(err);
  process.exit(1);
});
