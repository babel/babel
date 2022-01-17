import rule from "../../lib/rules/no-unused-expressions.cjs";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const ruleTester = new RuleTester();
ruleTester.run("@babel/no-unused-expressions", rule, {
  valid: [
    "let a = do { if (foo) { foo.bar; } }",
    "let a = do { foo; }",
    "let a = do { let b = 2; foo; }",
    "let a = do { (foo + 1); }",
    "let a = do { if (foo) { if (foo.bar) { foo.bar; } } }",
    "let a = do { if (foo) { if (foo.bar) { foo.bar; } else if (foo.baz) { foo.baz; } } }",
    "foo.bar?.();",
  ],
  invalid: [
    {
      code: "let a = do { foo; let b = 2; }",
      errors: [
        {
          message:
            "Expected an assignment or function call and instead saw an expression.",
          type: "ExpressionStatement",
        },
      ],
    },
    {
      code: "let a = do { if (foo) { foo.bar } else { a; bar.foo } }",
      errors: [
        {
          message:
            "Expected an assignment or function call and instead saw an expression.",
          type: "ExpressionStatement",
        },
      ],
    },
  ],
});
