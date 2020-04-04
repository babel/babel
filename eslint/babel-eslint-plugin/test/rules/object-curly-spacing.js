import rule from "../../src/rules/object-curly-spacing";
import RuleTester from "@babel/eslint-shared-fixtures/utils/RuleTester";

const ruleTester = new RuleTester();
ruleTester.run("@babel/object-curly-spacing", rule, {
  valid: ['export x from "mod";'],
  invalid: [],
});
