import plugin from "../../lib/index.js";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const rule = plugin.rules["new-cap"];

const ruleTester = new RuleTester();
ruleTester.run("@babel/new-cap", rule, {
  valid: [
    {
      code: "@MyDecorator(123) class MyClass{}",
    },
  ],
  invalid: [],
});
