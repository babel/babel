// @flow
import type { Formatter } from "./formatters";
import { normalizeReplacements, type TemplateOpts } from "./options";
import parseAndBuildMetadata from "./parse";
import populatePlaceholders from "./populate";

export default function stringTemplate<T>(
  formatter: Formatter<T>,
  code: string,
  opts: TemplateOpts,
): mixed => T {
  code = formatter.code(code);

  let metadata;

  return (arg?: mixed) => {
    const replacements = normalizeReplacements(arg);

    if (!metadata) metadata = parseAndBuildMetadata(formatter, code, opts);

    return formatter.unwrap(populatePlaceholders(metadata, replacements));
  };
}
