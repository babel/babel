import rule from "../../lib/rules/new-cap.cjs";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const ruleTester = new RuleTester();
ruleTester.run("@babel/new-cap", rule, {
  valid: [
    {
      code: "@MyDecorator(123) class MyClass{}",
    },
  ],
  invalid: [],
});
