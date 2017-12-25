"use strict";

const eslint = require("eslint");
const assert = require("assert");
const babelEslint = require("..");
const espree = require("espree");
var assertImplementsAST = require("./fixtures/assert-implements-ast");

describe("https://github.com/babel/babel-eslint/issues/558", () => {
  it("don't crash with eslint-plugin-import", () => {
    const engine = new eslint.CLIEngine({ ignore: false });
    engine.executeOnFiles([
      "test/fixtures/eslint-plugin-import/a.js",
      "test/fixtures/eslint-plugin-import/b.js",
      "test/fixtures/eslint-plugin-import/c.js",
    ]);
  });

  /*
   * This test ensures that the enhanced referencer does not get used if eslint-scope has already been
   * monkeypatched, because this causes some correctness issues. For example, if the enhanced referencer
   * is used after the original referencer is monkeypatched, type annotation references are counted twice.
   */
  it("does not visit type annotations multiple times after monkeypatching and calling parseForESLint()", () => {
    assertImplementsAST(
      espree.parse("foo", { sourceType: "module" }),
      babelEslint.parse("foo", {})
    );
    const parseResult = babelEslint.parseForESLint(
      "type Foo = {}; function x(): Foo {}",
      {
        eslintVisitorKeys: true,
        eslintScopeManager: true,
      }
    );
    assert(parseResult.visitorKeys);
    assert(parseResult.scopeManager);

    const fooVariable = parseResult.scopeManager.getDeclaredVariables(
      parseResult.ast.body[0]
    )[0];

    assert.strictEqual(fooVariable.references.length, 1);
  });
});
