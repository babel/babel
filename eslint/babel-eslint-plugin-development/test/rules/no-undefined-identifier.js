"use strict";

const rule = require("../../src/rules/no-undefined-identifier");
const { RuleTester } = require("eslint");

const error =
  "Use path.scope.buildUndefinedNode() to create an undefined identifier directly.";

const ruleTester = new RuleTester({
  parserOptions: { sourceType: "module" },
});

ruleTester.run("no-undefined-identifier", rule, {
  valid: [
    `_.identifier("undefined")`,
    `_.Identifier("undefined")`,
    `import * as t from "lib"; t.identifier("undefined");`,
    `function f(_) { _.types.identifier("undefined"); }`,
    `import * as t from "@babel/types"; t.identifier("not_undefined");`,
    `path.scope.buildUndefinedNode();`,
  ],
  invalid: [
    {
      code: `import { identifier } from "@babel/types"; identifier("undefined");`,
      errors: [error],
    },
    {
      code: `import { Identifier } from "@babel/types"; Identifier("undefined");`,
      errors: [error],
    },
    {
      code: `import * as t from "@babel/types"; t.identifier("undefined");`,
      errors: [error],
    },
    {
      code: `import * as t from "@babel/types"; var { identifier } = t; identifier("undefined");`,
      errors: [error],
    },
    {
      code: `import { identifier as id } from "@babel/types"; id("undefined");`,
      errors: [error],
    },
    {
      code: `import * as babel from "@babel/core"; babel.types.identifier("undefined");`,
      errors: [error],
    },
    {
      code: `import { types } from "@babel/core"; types.identifier("undefined");`,
      errors: [error],
    },
    {
      code: `import { types as t } from "@babel/core"; t.identifier("undefined");`,
      errors: [error],
    },
    {
      code: `export default function plugin(babel) { babel.types.identifier("undefined") }`,
      errors: [error],
    },
    {
      code: `export default function plugin({ types }) { types.identifier("undefined") }`,
      errors: [error],
    },
    {
      code: `export default function plugin({ types: t }) { t.identifier("undefined") }`,
      errors: [error],
    },
    {
      code: `export default ({ types }) => { types.identifier("undefined") }`,
      errors: [error],
    },
    {
      code: `module.exports = function plugin({ types }) { types.identifier("undefined") }`,
      errors: [error],
    },
    {
      code: `import { declare } from "@babel/helper-plugin-utils"; declare(({ types }) => { types.identifier("undefined") });`,
      errors: [error],
    },
  ],
});
