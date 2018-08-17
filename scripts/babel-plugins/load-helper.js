"use strict";

const fs = require("fs");
const path = require("path");

const getHelperPath = (filename, helper) =>
  path.join(path.dirname(filename), "helpers", helper + ".js");

module.exports = function loadHelper({ template }) {
  return {
    visitor: {
      CallExpression(path) {
        if (!path.get("callee").isIdentifier({ name: "helper" })) return;

        const args = path.get("arguments");
        if (args.length !== 2) return;
        if (!args[0].isStringLiteral()) return;
        if (!args[1].isStringLiteral()) return;

        // helper(STRING, STRING)

        const name = args[1].node.value;
        const helperPath = getHelperPath(this.filename, name);
        const helper = fs.readFileSync(helperPath, "utf8");

        // TODO: Minify the helper code?

        path.replaceWith(template.ast`helper(${args[0].node})("${helper}")`);
      },
    },
  };
};
