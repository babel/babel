import rule from "../../src/rules/dry-error-messages";
import RuleTester from "@babel/eslint-shared-fixtures/utils/RuleTester";

const ruleTester = new RuleTester();

ruleTester.run("dry-error-messages", rule, {
  valid: [],
  invalid: [],
});
