import type { ParserOptions as ParserOpts } from "@babel/parser";

export type { ParserOpts };

/**
 * These are the options that 'babel-template' actually accepts and typechecks
 * when called. All other options are passed through to the parser.
 */
export type PublicOpts = {
  /**
   * A set of placeholder names to automatically accept, ignoring the given
   * pattern entirely.
   *
   * This option can be used when using %%foo%% style placeholders.
   */
  placeholderAllowlist?: Set<string>;
  /**
   * A pattern to search for when looking for Identifier and StringLiteral
   * nodes that can be replaced.
   *
   * 'false' will disable placeholder searching entirely, leaving only the
   * 'placeholderAllowlist' value to find replacements.
   *
   * Defaults to /^[_$A-Z0-9]+$/.
   *
   * This option can be used when using %%foo%% style placeholders.
   */
  placeholderPattern?: RegExp | false;
  /**
   * 'true' to pass through comments from the template into the resulting AST,
   * or 'false' to automatically discard comments. Defaults to 'false'.
   */
  preserveComments?: boolean;
  /**
   * 'true' to use %%foo%% style placeholders, 'false' to use legacy placeholders
   * described by placeholderPattern or placeholderAllowlist.
   * When it is not set, it behaves as 'true' if there are syntactic placeholders,
   * otherwise as 'false'.
   */
  syntacticPlaceholders?: boolean | null;
} & ParserOpts;

export type TemplateOpts = {
  parser: ParserOpts;
  placeholderAllowlist?: Set<string>;
  placeholderPattern?: RegExp | false;
  preserveComments?: boolean;
  syntacticPlaceholders?: boolean;
};

export function merge(a: TemplateOpts, b: TemplateOpts): TemplateOpts {
  const {
    placeholderAllowlist = a.placeholderAllowlist,
    placeholderPattern = a.placeholderPattern,
    preserveComments = a.preserveComments,
    syntacticPlaceholders = a.syntacticPlaceholders,
  } = b;

  return {
    parser: {
      ...a.parser,
      ...b.parser,
    },
    placeholderAllowlist,
    placeholderPattern,
    preserveComments,
    syntacticPlaceholders,
  };
}

export function validate(opts: unknown): TemplateOpts {
  if (opts != null && typeof opts !== "object") {
    throw new Error("Unknown template options.");
  }

  if (opts != null && Object.hasOwn(opts as object, "placeholderWhitelist")) {
    throw new Error(
      "The 'placeholderWhitelist' option has been renamed to " +
        "'placeholderAllowlist'. Please update your configuration.",
    );
  }

  const {
    placeholderAllowlist,
    placeholderPattern,
    preserveComments,
    syntacticPlaceholders,
    ...parser
  } = opts || ({} as any);

  if (placeholderAllowlist != null && !(placeholderAllowlist instanceof Set)) {
    throw new Error(
      "'.placeholderAllowlist' must be a Set, null, or undefined",
    );
  }

  if (
    placeholderPattern != null &&
    !(placeholderPattern instanceof RegExp) &&
    placeholderPattern !== false
  ) {
    throw new Error(
      "'.placeholderPattern' must be a RegExp, false, null, or undefined",
    );
  }

  if (preserveComments != null && typeof preserveComments !== "boolean") {
    throw new Error(
      "'.preserveComments' must be a boolean, null, or undefined",
    );
  }

  if (
    syntacticPlaceholders != null &&
    typeof syntacticPlaceholders !== "boolean"
  ) {
    throw new Error(
      "'.syntacticPlaceholders' must be a boolean, null, or undefined",
    );
  }
  if (
    syntacticPlaceholders === true &&
    (placeholderAllowlist != null || placeholderPattern != null)
  ) {
    throw new Error(
      "'.placeholderAllowlist' and '.placeholderPattern' aren't compatible" +
        " with '.syntacticPlaceholders: true'",
    );
  }

  return {
    parser,
    placeholderAllowlist: placeholderAllowlist || undefined,
    placeholderPattern:
      placeholderPattern == null ? undefined : placeholderPattern,
    preserveComments: preserveComments == null ? undefined : preserveComments,
    syntacticPlaceholders:
      syntacticPlaceholders == null ? undefined : syntacticPlaceholders,
  };
}

export type PublicReplacements = Record<string, unknown> | unknown[];
export type TemplateReplacements = Record<string, unknown> | void;

export function normalizeReplacements(
  replacements: unknown,
): TemplateReplacements {
  if (Array.isArray(replacements)) {
    return replacements.reduce((acc, replacement, i) => {
      acc["$" + i] = replacement;
      return acc;
    }, {});
  } else if (typeof replacements === "object" || replacements == null) {
    return (replacements as any) || undefined;
  }

  throw new Error(
    "Template replacements must be an array, object, null, or undefined",
  );
}
