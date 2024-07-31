import * as commander from "commander";

export const program = process.env.BABEL_8_BREAKING
  ? commander.program
  : commander.default.program;

function collect(value: unknown, previousValue: string[]): Array<string> {
  // If the user passed the option with no value, like "babel-node file.js --presets", do nothing.
  if (typeof value !== "string") return previousValue;

  const values = value.split(",");

  if (previousValue) {
    previousValue.push(...values);
    return previousValue;
  }
  return values;
}

program.name("babel-node");
program.option("-e, --eval [script]", "Evaluate script");
program.option(
  "--no-babelrc",
  "Specify whether or not to use .babelrc and .babelignore files",
);
program.option("-r, --require [module]", "Require module");
program.option("-p, --print [code]", "Evaluate script and print result");
program.option(
  "-o, --only [globs]",
  "A comma-separated list of glob patterns to compile",
  collect,
);
program.option(
  "-i, --ignore [globs]",
  "A comma-separated list of glob patterns to skip compiling",
  collect,
);
program.option(
  "-x, --extensions [extensions]",
  "List of extensions to hook into [.es6,.js,.es,.jsx,.mjs]",
  collect,
);
program.option(
  "--config-file [path]",
  "Path to the babel config file to use. Defaults to working directory babel.config.js",
);
program.option(
  "--env-name [name]",
  "The name of the 'env' to use when loading configs and plugins. " +
    "Defaults to the value of BABEL_ENV, or else NODE_ENV, or else 'development'.",
);
program.option(
  "--root-mode [mode]",
  "The project-root resolution mode. " +
    "One of 'root' (the default), 'upward', or 'upward-optional'.",
);
program.option("-w, --plugins [string]", "", collect);
program.option("-b, --presets [string]", "", collect);

if (!process.env.BABEL_8_BREAKING) {
  // This is only needed in Babel 7, because for Babel 8
  // we are always passing user arguments after --
  program.allowUnknownOption(true);
}

program.version(PACKAGE_JSON.version);
program.usage(`[options] [ -e "script" | script.js ] [--] [arguments]`);
