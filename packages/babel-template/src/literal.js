// @flow

import type { Formatter } from "./formatters";
import { normalizeReplacements, type TemplateOpts } from "./options";
import parseAndBuildMetadata from "./parse";
import populatePlaceholders from "./populate";

export default function literalTemplate<T>(
  formatter: Formatter<T>,
  tpl: Array<string>,
  opts: TemplateOpts,
): (Array<mixed>) => mixed => T {
  const { metadata, names } = buildLiteralData(formatter, tpl, opts);

  return (arg: Array<mixed>) => {
    const defaultReplacements = arg.reduce((acc, replacement, i) => {
      acc[names[i]] = replacement;
      return acc;
    }, {});

    return (arg: mixed) => {
      const replacements = normalizeReplacements(arg);

      if (replacements) {
        Object.keys(replacements).forEach(key => {
          if (Object.prototype.hasOwnProperty.call(defaultReplacements, key)) {
            throw new Error("Unexpected replacement overlap.");
          }
        });
      }

      return formatter.unwrap(
        populatePlaceholders(
          metadata,
          replacements
            ? Object.assign(replacements, defaultReplacements)
            : defaultReplacements,
        ),
      );
    };
  };
}

function buildLiteralData<T>(
  formatter: Formatter<T>,
  tpl: Array<string>,
  opts: TemplateOpts,
) {
  let names;
  let nameSet;
  let metadata;
  let prefix = "";

  do {
    // If there are cases where the template already contains $0 or any other
    // matching pattern, we keep adding "$" characters until a unique prefix
    // is found.
    prefix += "$";
    const result = buildTemplateCode(tpl, prefix);

    names = result.names;
    nameSet = new Set(names);
    metadata = parseAndBuildMetadata(formatter, formatter.code(result.code), {
      parser: opts.parser,

      // Explicitly include our generated names in the whitelist so users never
      // have to think about whether their placeholder pattern will match.
      placeholderWhitelist: new Set(
        result.names.concat(
          opts.placeholderWhitelist
            ? Array.from(opts.placeholderWhitelist)
            : [],
        ),
      ),
      placeholderPattern: opts.placeholderPattern,
      preserveComments: opts.preserveComments,
    });
  } while (
    metadata.placeholders.some(
      placeholder => placeholder.isDuplicate && nameSet.has(placeholder.name),
    )
  );

  return { metadata, names };
}

function buildTemplateCode(
  tpl: Array<string>,
  prefix: string,
): { names: Array<string>, code: string } {
  const names = [];

  let code = tpl[0];

  for (let i = 1; i < tpl.length; i++) {
    const value = `${prefix}${i - 1}`;
    names.push(value);

    code += value + tpl[i];
  }

  return { names, code };
}
