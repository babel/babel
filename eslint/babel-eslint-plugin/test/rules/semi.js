import rule from "../../lib/rules/semi.cjs";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const ruleTester = new RuleTester();

ruleTester.run("semi", rule, {
  valid: [
    "class Foo { bar = 'example'; }",
    "class Foo { #bar = 'example'; }",
    "class Foo { static bar = 'example'; }",
    {
      code: "class Foo { bar = () => {}; }",
      options: ["always", { omitLastInOneLineBlock: true }],
    },

    // never
    { code: "class Foo { bar = 'example' }", options: ["never"] },
    { code: "class Foo { #bar = 'example' }", options: ["never"] },
    { code: "class Foo { static bar = 'example' }", options: ["never"] },
    { code: "class Foo { bar = () => {} }", options: ["never"] },
  ],
  invalid: [
    {
      code: "class Foo { bar = 'example' }",
      output: "class Foo { bar = 'example'; }",
      errors: [{ message: "Missing semicolon." }],
    },
    {
      code: "class Foo { #bar = 'example' }",
      output: "class Foo { #bar = 'example'; }",
      errors: [{ message: "Missing semicolon." }],
    },
    {
      code: "class Foo { static bar = 'example' }",
      output: "class Foo { static bar = 'example'; }",
      errors: [{ message: "Missing semicolon." }],
    },
    {
      code: "class Foo { bar = () => {} }",
      output: "class Foo { bar = () => {}; }",
      options: ["always", { omitLastInOneLineBlock: true }],
      errors: [{ message: "Missing semicolon." }],
    },

    // "never"
    {
      code: "class Foo { bar = 'example'; }",
      output: "class Foo { bar = 'example' }",
      options: ["never"],
      errors: [{ message: "Extra semicolon." }],
    },
    {
      code: "class Foo { #bar = 'example'; }",
      output: "class Foo { #bar = 'example' }",
      options: ["never"],
      errors: [{ message: "Extra semicolon." }],
    },
    {
      code: "class Foo { static bar = 'example'; }",
      output: "class Foo { static bar = 'example' }",
      options: ["never"],
      errors: [{ message: "Extra semicolon." }],
    },
    {
      code: "class Foo { bar = () => {}; }",
      output: "class Foo { bar = () => {} }",
      options: ["never"],
      errors: [{ message: "Extra semicolon." }],
    },
  ],
});
