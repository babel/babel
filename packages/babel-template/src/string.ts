import type { Formatter } from "./formatters.ts";
import type { TemplateOpts } from "./options.ts";
import type { Metadata } from "./parse.ts";
import { normalizeReplacements } from "./options.ts";
import parseAndBuildMetadata from "./parse.ts";
import populatePlaceholders from "./populate.ts";

export default function stringTemplate<T>(
  formatter: Formatter<T>,
  code: string,
  opts: TemplateOpts,
): (arg?: unknown) => T {
  code = formatter.code(code);

  let metadata: Metadata;

  return (arg?: unknown) => {
    const replacements = normalizeReplacements(arg);

    if (!metadata) metadata = parseAndBuildMetadata(formatter, code, opts);

    return formatter.unwrap(populatePlaceholders(metadata, replacements));
  };
}
