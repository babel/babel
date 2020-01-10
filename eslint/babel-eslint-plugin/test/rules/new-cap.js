import rule from "../../src/rules/new-cap";
import RuleTester from "../helpers/RuleTester";

const ruleTester = new RuleTester();
ruleTester.run("@babel/new-cap", rule, {
  valid: [
    {
      code: "@MyDecorator(123) class MyClass{}",
    },
  ],
  invalid: [],
});
