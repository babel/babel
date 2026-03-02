import rule from "../../lib/rules/no-undef.cjs";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const ruleTester = new RuleTester();
ruleTester.run("@babel/no-undef", rule, {
  valid: [
    { code: "class MyClass { accessor x = 2 }" },
    {
      code: "var x; class MyClass { accessor [x] = 2 }",
    },
    { code: "using x = 2; x;" },
  ],
  invalid: [
    {
      code: "class MyClass { accessor x = y }",
      errors: [{ message: "'y' is not defined." }],
    },
    {
      code: "{ using x = 2; } x;",
      errors: [{ message: "'x' is not defined." }],
    },
    {
      code: "class MyClass { accessor [x] = 2 }",
      errors: [{ message: "'x' is not defined." }],
    },
  ],
});
