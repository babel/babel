const assert = require("assert");
const babel = require("babel-core");

test("Doesn't use the same object for two different nodes in the AST", function() {
  const code = 'import Foo from "bar"; Foo; Foo;';

  const ast = babel.transform(code, {
    plugins: [[require("../"), { loose: true }]],
  }).ast;

  assert.equal(ast.program.body[0].declarations[0].id.type, "Identifier");
  assert.equal(ast.program.body[2].expression.type, "MemberExpression");
  assert.equal(ast.program.body[2].expression.object.type, "Identifier");
  assert.equal(ast.program.body[3].expression.type, "MemberExpression");
  assert.equal(ast.program.body[3].expression.object.type, "Identifier");

  assert.notStrictEqual(
    ast.program.body[2].expression.object,
    ast.program.body[3].expression.object,
    "Expected different nodes in the AST to not be the same object (one)",
  );

  assert.notStrictEqual(
    ast.program.body[0].declarations[0].id,
    ast.program.body[3].expression.object,
    "Expected different nodes in the AST to not be the same object (two)",
  );
  assert.notStrictEqual(
    ast.program.body[0].declarations[0].id,
    ast.program.body[2].expression.object,
    "Expected different nodes in the AST to not be the same object (three)",
  );
});
