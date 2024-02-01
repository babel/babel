import type { Formatter } from "./formatters.ts";
import type { TemplateReplacements, TemplateOpts } from "./options.ts";
import { normalizeReplacements } from "./options.ts";
import parseAndBuildMetadata from "./parse.ts";
import populatePlaceholders from "./populate.ts";

export default function literalTemplate<T>(
  formatter: Formatter<T>,
  tpl: Array<string>,
  opts: TemplateOpts,
): (_: Array<unknown>) => (_: unknown) => T {
  const { metadata, names } = buildLiteralData(formatter, tpl, opts);

  return arg => {
    const defaultReplacements: TemplateReplacements = {};
    arg.forEach((replacement, i) => {
      defaultReplacements[names[i]] = replacement;
    });

    return (arg: unknown) => {
      const replacements = normalizeReplacements(arg);

      if (replacements) {
        Object.keys(replacements).forEach(key => {
          if (Object.hasOwn(defaultReplacements, key)) {
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
  let prefix = "BABEL_TPL$";

  const raw = tpl.join("");

  do {
    // If there are cases where the template already contains $$BABEL_TPL$0 or any other
    // matching pattern, we keep adding "$$" characters until a unique prefix
    // is found.
    prefix = "$$" + prefix;
  } while (raw.includes(prefix));

  const { names, code } = buildTemplateCode(tpl, prefix);

  const metadata = parseAndBuildMetadata(formatter, formatter.code(code), {
    parser: opts.parser,

    // Explicitly include our generated names in the whitelist so users never
    // have to think about whether their placeholder pattern will match.
    placeholderWhitelist: new Set(
      names.concat(
        opts.placeholderWhitelist ? Array.from(opts.placeholderWhitelist) : [],
      ),
    ),
    placeholderPattern: opts.placeholderPattern,
    preserveComments: opts.preserveComments,
    syntacticPlaceholders: opts.syntacticPlaceholders,
  });

  return { metadata, names };
}

function buildTemplateCode(
  tpl: Array<string>,
  prefix: string,
): { names: Array<string>; code: string } {
  const names = [];

  let code = tpl[0];

  for (let i = 1; i < tpl.length; i++) {
    const value = `${prefix}${i - 1}`;
    names.push(value);

    code += value + tpl[i];
  }

  return { names, code };
}
