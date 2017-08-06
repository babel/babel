const assert = require("assert");
const babel = require("babel-core");

test("Doesn't use the same object for two different nodes in the AST", function() {
  const code = 'import Foo from "bar"; Foo; Foo;';

  const ast = babel.transform(code, {
    plugins: [[require("../"), { loose: true }]],
  }).ast;

  assert.equal(ast.program.body[3].expression.type, "MemberExpression");
  assert.equal(ast.program.body[4].expression.type, "MemberExpression");

  assert.notEqual(
    ast.program.body[3].expression,
    ast.program.body[4].expression,
    "Expected different nodes in the AST to not be the same object",
  );
});
