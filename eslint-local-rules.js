"use strict";

const noDeprecatedClone = require("./scripts/eslint_rules/no-deprecated-clone");
const noUndefinedIdentifier = require("./scripts/eslint_rules/no-undefined-identifier");

module.exports = {
  "no-deprecated-clone": noDeprecatedClone,
  "no-undefined-identifier": noUndefinedIdentifier,
};
