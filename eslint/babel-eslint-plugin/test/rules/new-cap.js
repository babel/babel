import rule from "../../lib/rules/new-cap.js";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const ruleTester = new RuleTester();
ruleTester.run("@babel/new-cap", rule.default, {
  valid: [
    {
      code: "@MyDecorator(123) class MyClass{}",
    },
  ],
  invalid: [],
});
