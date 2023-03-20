import { Command } from "commander";
import { buildExternalHelpers } from "@babel/core";

function collect(
  value: string | any,
  previousValue: Array<string>,
): Array<string> {
  // If the user passed the option with no value, like "babel-external-helpers --whitelist", do nothing.
  if (typeof value !== "string") return previousValue;

  const values = value.split(",");

  if (previousValue) {
    previousValue.push(...values);
    return previousValue;
  }
  return values;
}

const command = new Command();

command.option(
  "-l, --whitelist [whitelist]",
  "Whitelist of helpers to ONLY include",
  collect,
);
command.option(
  "-t, --output-type [type]",
  "Type of output (global|umd|var)",
  "global",
);

command.usage("[options]");
command.parse();
const opts = command.opts();

console.log(buildExternalHelpers(opts.whitelist, opts.outputType));
