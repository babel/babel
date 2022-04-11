import rule from "../../lib/rules/object-curly-spacing.cjs";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const ruleTester = new RuleTester();
ruleTester.run("@babel/object-curly-spacing", rule, {
  valid: ['export x from "mod";'],
  invalid: [],
});
