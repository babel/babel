"use strict";

// Always use the latest available version of Unicode!
// https://tc39.github.io/ecma262/#sec-conformance
const latestVersion = "13.0.0";
const lowestSupportedVersion = "12.0.0"; // supported by Node.js 10

/* This script generate the regex to validate whether a given string is a valid JavaScript identifier.
  isIdentifierStart:
  /[ $_ \p{ID_Start} ...(new code points supported only in later Node.js versions) ]/u
  isIdentifierContinue:
  /[ $_ \p{ID_Continue} ...(new code points supported only in later Node.js versions) ]/u
*/

const regenerate = require("regenerate");
const startDiffRegex = regenerate()
  .add(
    require(`@unicode/unicode-${latestVersion}//Binary_Property/ID_Start/code-points.js`)
  )
  .remove(
    require(`@unicode/unicode-${lowestSupportedVersion}//Binary_Property/ID_Start/code-points.js`)
  )
  .toString({ hasUnicodeFlag: true });

const continueDiffRegex = regenerate()
  .add([0x200c, 0x200d])
  .add(
    require(`@unicode/unicode-${latestVersion}//Binary_Property/ID_Continue/code-points.js`)
  )
  .remove(
    require(`@unicode/unicode-${lowestSupportedVersion}//Binary_Property/ID_Continue/code-points.js`)
  )
  .toString({ hasUnicodeFlag: true });

const isIDStartRegex = "[$_\\p{ID_Start}" + startDiffRegex.slice(1);
const isIDContinueRegex = "[\\p{ID_Continue}" + continueDiffRegex.slice(1);

console.log("/* eslint-disable no-misleading-character-class */");
console.log("const isIDStart = /" + isIDStartRegex + "/u;");
console.log("const isIDContinue = /" + isIDContinueRegex + "/u;");
console.log("const isID = /^" + isIDStartRegex + isIDContinueRegex + "*$/u;");
console.log("/* eslint-enable no-misleading-character-class */");
