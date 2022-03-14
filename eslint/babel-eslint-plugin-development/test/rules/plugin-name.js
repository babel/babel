import rule from "../../lib/rules/plugin-name.cjs";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const missingPluginError = "This file does not export a Babel plugin.";
const missingNameError = "This Babel plugin doesn't have a 'name' property.";

const ruleTester = new RuleTester();

ruleTester.run("plugin-name", rule, {
  valid: [
    `export default function () { return { name: "test-plugin" } }`,
    `import { declare } from "@babel/helper-plugin-utils"; declare(() => { return { name: "test-plugin" } })`,
    `import { declare } from "@babel/helper-plugin-utils"; declare(() => ({ name: "test-plugin" }))`,
    `module.exports = function () { return { name: "foo" }; }`,
  ],
  invalid: [
    {
      code: `function fn() { return { name: "foo" } }`,
      errors: [missingPluginError],
    },
    {
      code: `export function fn() { return { name: "foo" } }`,
      errors: [missingPluginError],
    },
    {
      code: `(function fn() { return { name: "foo" } })`,
      errors: [missingPluginError],
    },
    {
      code: `() => { return { name: "foo" } }`,
      errors: [missingPluginError],
    },
    {
      code: `export default function fn() {}`,
      errors: [missingPluginError],
    },
    {
      code: `export default function fn() { return {} }`,
      errors: [missingNameError],
    },
    {
      code: `import { declare } from "@babel/helper-plugin-utils"; declare(() => ({}))`,
      errors: [missingNameError],
    },
    {
      code: `module.exports = function () { return {} }`,
      errors: [missingNameError],
    },
  ],
});
