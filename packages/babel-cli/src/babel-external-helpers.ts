import * as commander from "commander";
import { buildExternalHelpers } from "@babel/core";

const program = process.env.BABEL_8_BREAKING
  ? commander.program
  : commander.default.program;

function collect(value: unknown, previousValue: Array<string>): Array<string> {
  // If the user passed the option with no value, like "babel-external-helpers --whitelist", do nothing.
  if (typeof value !== "string") return previousValue;

  const values = value.split(",");

  if (previousValue) {
    previousValue.push(...values);
    return previousValue;
  }
  return values;
}

program.option(
  "-l, --whitelist [whitelist]",
  "Whitelist of helpers to ONLY include",
  collect,
);
program.option(
  "-t, --output-type [type]",
  "Type of output (global|umd|var)",
  "global",
);

program.usage("[options]");
program.parse(process.argv);
const opts = program.opts();

console.log(buildExternalHelpers(opts.whitelist, opts.outputType));
