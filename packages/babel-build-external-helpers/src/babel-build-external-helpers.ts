import * as commander from "commander";
import { buildExternalHelpers } from "@babel/core";

const { program, InvalidArgumentError } = commander;
function collect(value: string, previousValue: string[]): string[] {
  const values = value.split(",");

  if (previousValue) {
    previousValue.push(...values);
    return previousValue;
  }
  return values;
}

program.option(
  "-l, --allowlist <allowlist>",
  "Allowlist of helpers to ONLY include",
  collect,
);
program.option(
  "--whitelist <whitelist>",
  "Removed: use --allowlist instead",
  () => {
    throw new InvalidArgumentError(
      "This option has been removed, please use -l or --allowlist instead.",
    );
  },
);
program.option(
  "-t, --output-type <type>",
  "Type of output (global|umd|var|module)",
  "global",
);

program.usage("[options]");
program.parse(process.argv);
const opts = program.opts();

console.log(buildExternalHelpers(opts.allowlist, opts.outputType));
