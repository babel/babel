// @flow

import type { Options as ParserOpts } from "@babel/parser/src/options";

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
  placeholderWhitelist?: ?Set<string>,

  /**
   * A pattern to search for when looking for Identifier and StringLiteral
   * nodes that can be replaced.
   *
   * 'false' will disable placeholder searching entirely, leaving only the
   * 'placeholderWhitelist' value to find replacements.
   *
   * Defaults to /^[_$A-Z0-9]+$/.
   *
   * This option can be used when using %%foo%% style placeholders.
   */
  placeholderPattern?: ?(RegExp | false),

  /**
   * 'true' to pass through comments from the template into the resulting AST,
   * or 'false' to automatically discard comments. Defaults to 'false'.
   */
  preserveComments?: ?boolean,

  /**
   * 'true' to use %%foo%% style placeholders, 'false' to use legacy placeholders
   * described by placeholderPattern or placeholderWhitelist.
   * When it is not set, it behaves as 'true' if there are syntactic placeholders,
   * otherwise as 'false'.
   */
  syntacticPlaceholders?: ?boolean,
};

export type TemplateOpts = {|
  parser: ParserOpts,
  placeholderWhitelist: Set<string> | void,
  placeholderPattern: RegExp | false | void,
  preserveComments: boolean | void,
  syntacticPlaceholders: boolean | void,
|};

export function merge(a: TemplateOpts, b: TemplateOpts): TemplateOpts {
  const {
    placeholderWhitelist = a.placeholderWhitelist,
    placeholderPattern = a.placeholderPattern,
    preserveComments = a.preserveComments,
    syntacticPlaceholders = a.syntacticPlaceholders,
  } = b;

  return {
    parser: {
      ...a.parser,
      ...b.parser,
    },
    placeholderWhitelist,
    placeholderPattern,
    preserveComments,
    syntacticPlaceholders,
  };
}

export function validate(opts: mixed): TemplateOpts {
  if (opts != null && typeof opts !== "object") {
    throw new Error("Unknown template options.");
  }

  const {
    placeholderWhitelist,
    placeholderPattern,
    preserveComments,
    syntacticPlaceholders,
    ...parser
  } = opts || {};

  if (placeholderWhitelist != null && !(placeholderWhitelist instanceof Set)) {
    throw new Error(
      "'.placeholderWhitelist' must be a Set, null, or undefined",
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
    (placeholderWhitelist != null || placeholderPattern != null)
  ) {
    throw new Error(
      "'.placeholderWhitelist' and '.placeholderPattern' aren't compatible" +
        " with '.syntacticPlaceholders: true'",
    );
  }

  return {
    parser,
    placeholderWhitelist: placeholderWhitelist || undefined,
    placeholderPattern:
      placeholderPattern == null ? undefined : placeholderPattern,
    preserveComments: preserveComments == null ? false : preserveComments,
    syntacticPlaceholders:
      syntacticPlaceholders == null ? undefined : syntacticPlaceholders,
  };
}

export type PublicReplacements = { [string]: mixed } | Array<mixed>;
export type TemplateReplacements = { [string]: mixed } | void;

export function normalizeReplacements(
  replacements: mixed,
): TemplateReplacements {
  if (Array.isArray(replacements)) {
    return replacements.reduce((acc, replacement, i) => {
      acc["$" + i] = replacement;
      return acc;
    }, {});
  } else if (typeof replacements === "object" || replacements == null) {
    return (replacements: any) || undefined;
  }

  throw new Error(
    "Template replacements must be an array, object, null, or undefined",
  );
}
