// @flow

import commander from "commander";
import isString from "lodash/isString";
import { buildExternalHelpers } from "@babel/core";

function collect(
  value: String | any,
  previousValue: Array<string>,
): Array<string> {
  // If the user passed the option with no value, like "babel-external-helpers --whitelist", do nothing.
  if (!isString(value)) return previousValue;

  const values = value.split(",");

  return previousValue ? previousValue.concat(values) : values;
}

commander.option(
  "-l, --whitelist [whitelist]",
  "Whitelist of helpers to ONLY include",
  collect,
);
commander.option(
  "-t, --output-type [type]",
  "Type of output (global|umd|var)",
  "global",
);

commander.usage("[options]");
commander.parse(process.argv);

console.log(buildExternalHelpers(commander.whitelist, commander.outputType));
