import * as babel from "@babel/core";
import { fileURLToPath } from "url";
import path from "path";

import transformCommonJS from "../lib/index.js";

test("Doesn't use the same object for two different nodes in the AST", function () {
  const code = 'import Foo from "bar"; Foo; Foo;';

  const ast = babel.transformSync(code, {
    cwd: path.dirname(fileURLToPath(import.meta.url)),
    ast: true,
    plugins: [[transformCommonJS, { loose: true }]],
  }).ast;

  expect(ast.program.body[0].declarations[0].id.type).toBe("Identifier");
  expect(ast.program.body[2].expression.type).toBe("MemberExpression");
  expect(ast.program.body[2].expression.object.type).toBe("Identifier");
  expect(ast.program.body[3].expression.type).toBe("MemberExpression");
  expect(ast.program.body[3].expression.object.type).toBe("Identifier");

  expect(ast.program.body[2].expression.object).not.toBe(
    ast.program.body[3].expression.object,
  );

  expect(ast.program.body[0].declarations[0].id).not.toBe(
    ast.program.body[3].expression.object,
  );
  expect(ast.program.body[0].declarations[0].id).not.toBe(
    ast.program.body[2].expression.object,
  );
});
