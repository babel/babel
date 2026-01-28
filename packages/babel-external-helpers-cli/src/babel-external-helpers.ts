import * as commander from "commander";
import { buildExternalHelpers } from "@babel/core";

const program = commander.program;
function collect(value: string, previousValue: string[]): string[] {
  const values = value.split(",");

  if (previousValue) {
    previousValue.push(...values);
    return previousValue;
  }
  return values;
}

program.option(
  "-l, --whitelist <whitelist>",
  "Whitelist of helpers to ONLY include",
  collect,
);
program.option(
  "-t, --output-type <type>",
  "Type of output (global|umd|var)",
  "global",
);

program.usage("[options]");
program.parse(process.argv);
const opts = program.opts();

console.log(buildExternalHelpers(opts.whitelist, opts.outputType));
