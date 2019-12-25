// @flow
import path from "path";
import escapeRegExp from "lodash/escapeRegExp";

const sep = `\\${path.sep}`;
const endSep = `(?:${sep}|$)`;

const substitution = `[^${sep}]+`;

const starPat = `(?:${substitution}${sep})`;
const starPatLast = `(?:${substitution}${endSep})`;

const starStarPat = `${starPat}*?`;
const starStarPatLast = `${starPat}*?${starPatLast}?`;

/**
 * Implement basic pattern matching that will allow users to do the simple
 * tests with * and **. If users want full complex pattern matching, then can
 * always use regex matching, or function validation.
 */

/**
 *  NOTE - This is copied from babel/core. Any changes to be made in function
 *  should be made in babel/core as well. This will be removed in v8
 *  Path - babel-core/src/config/pattern-to-regex
 */

export default function pathToPattern(
  pattern: string,
  dirname: string,
): RegExp {
  const parts = path.resolve(dirname, pattern).split(path.sep);

  return new RegExp(
    [
      "^",
      ...parts.map((part, i) => {
        const last = i === parts.length - 1;

        // ** matches 0 or more path parts.
        if (part === "**") return last ? starStarPatLast : starStarPat;

        // * matches 1 path part.
        if (part === "*") return last ? starPatLast : starPat;

        // *.ext matches a wildcard with an extension.
        if (part.indexOf("*.") === 0) {
          return (
            substitution + escapeRegExp(part.slice(1)) + (last ? endSep : sep)
          );
        }

        // Otherwise match the pattern text.
        return escapeRegExp(part) + (last ? endSep : sep);
      }),
    ].join(""),
  );
}
