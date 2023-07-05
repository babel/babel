import { parse } from "@babel/parser";
import * as t from "@babel/types";

import _traverse from "../lib/index.js";
const traverse = _traverse.default || _traverse;

import { callFromAtBabelPackage } from "./helpers/@babel/fake-babel-package/index.js";

describe("traverse", function () {
  const code = `
    var foo = "bar";
    this.test = "wow";
  `;
  const ast = parse(code);
  const program = ast.program;
  const body = program.body;

  it("traverse replace", function () {
    const replacement = {
      type: "StringLiteral",
      value: "foo",
    };
    const ast2 = JSON.parse(JSON.stringify(program));

    traverse(ast2, {
      enter: function (path) {
        if (path.node.type === "ThisExpression") path.replaceWith(replacement);
      },
    });

    expect(ast2.body[1].expression.left.object).toBe(replacement);
  });

  it("traverse", function () {
    const expected = [
      body[0],
      body[0].declarations[0],
      body[0].declarations[0].id,
      body[0].declarations[0].init,
      body[1],
      body[1].expression,
      body[1].expression.left,
      body[1].expression.left.object,
      body[1].expression.left.property,
      body[1].expression.right,
    ];

    const actual = [];

    traverse(program, {
      enter: function (path) {
        actual.push(path.node);
      },
    });

    expect(actual).toEqual(expected);
  });

  it("traverse falsy parent", function () {
    traverse(null, {
      enter: function () {
        throw new Error("should not be ran");
      },
    });
  });

  it("traverse denylistTypes", function () {
    const expected = [
      body[0],
      body[0].declarations[0],
      body[0].declarations[0].id,
      body[0].declarations[0].init,
      body[1],
      body[1].expression,
      body[1].expression.right,
    ];

    const actual = [];

    traverse(program, {
      denylist: ["MemberExpression"],
      enter: function (path) {
        actual.push(path.node);
      },
    });

    expect(actual).toEqual(expected);
  });

  it("hasType", function () {
    expect(traverse.hasType(ast, "ThisExpression")).toBeTruthy();
    expect(
      traverse.hasType(ast, "ThisExpression", ["AssignmentExpression"]),
    ).toBeFalsy();

    expect(traverse.hasType(ast, "ThisExpression")).toBeTruthy();
    expect(traverse.hasType(ast, "Program")).toBeTruthy();

    expect(
      traverse.hasType(ast, "ThisExpression", ["MemberExpression"]),
    ).toBeFalsy();
    expect(traverse.hasType(ast, "ThisExpression", ["Program"])).toBeFalsy();

    expect(traverse.hasType(ast, "ArrowFunctionExpression")).toBeFalsy();
  });

  it("clearCache", function () {
    const paths = [];
    const scopes = [];
    traverse(ast, {
      enter(path) {
        scopes.push(path.scope);
        paths.push(path);
        path.stop();
      },
    });

    traverse.cache.clear();

    const paths2 = [];
    const scopes2 = [];
    traverse(ast, {
      enter(path) {
        scopes2.push(path.scope);
        paths2.push(path);
        path.stop();
      },
    });

    scopes2.forEach(function (_, i) {
      expect(scopes[i]).not.toBe(scopes2[i]);
      expect(paths[i]).not.toBe(paths2[i]);
    });
  });

  it("clearPath", function () {
    const paths = [];
    traverse(ast, {
      enter(path) {
        paths.push(path);
      },
    });

    traverse.cache.clearPath();

    const paths2 = [];
    traverse(ast, {
      enter(path) {
        paths2.push(path);
      },
    });

    paths2.forEach(function (p, i) {
      expect(p).not.toBe(paths[i]);
    });
  });

  it("clearScope", function () {
    const scopes = [];
    traverse(ast, {
      enter(path) {
        scopes.push(path.scope);
        path.stop();
      },
    });

    traverse.cache.clearScope();

    const scopes2 = [];
    traverse(ast, {
      enter(path) {
        scopes2.push(path.scope);
        path.stop();
      },
    });

    scopes2.forEach(function (p, i) {
      expect(p).not.toBe(scopes[i]);
    });
  });

  describe("path.skip()", function () {
    it("replaced paths can be skipped", function () {
      const ast = parse("id");

      let skipped;
      traverse(ast, {
        noScope: true,
        Identifier(path) {
          path.replaceWith(t.numericLiteral(0));
          path.skip();
          skipped = true;
        },
        NumericLiteral() {
          skipped = false;
        },
      });

      expect(skipped).toBe(true);
    });

    // Skipped: see the comment in the `NodePath.requeue` method.
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("skipped and requeued paths should be visited", function () {
      const ast = parse("id");

      let visited = false;
      traverse(ast, {
        noScope: true,
        Identifier(path) {
          path.replaceWith(t.numericLiteral(0));
          path.skip();
          path.requeue();
        },
        NumericLiteral() {
          visited = true;
        },
      });

      expect(visited).toBe(true);
    });
  });
  describe("path.traverse()", () => {
    it("should preserve traversal context after enter hook is executed", () => {
      const ast = parse("{;}");
      // The test initiates a sub-traverse from program. When the `enter` hook of BlockStatement
      // is called, the unshiftContainer will change the traversal context of the BlockStatement
      // to the one of Program which has an EmptyStatement visitor. If the traversal context
      // is not restored after the `enter` hook is executed, the `EmptyStatement` visitor will
      // be run twice: one in the sub-traverse and the other in the top level traverse.
      let emptyStatementVisitedCounter = 0;
      traverse(ast, {
        noScope: true,
        Program(path) {
          path.traverse({
            noScope: true,
            BlockStatement: {
              enter(path) {
                path.parentPath.unshiftContainer("body", [t.numericLiteral(0)]);
              },
            },
          });
        },
        EmptyStatement() {
          ++emptyStatementVisitedCounter;
        },
      });
      expect(emptyStatementVisitedCounter).toBe(1);
    });
    it("should preserve traversal context after visitor is executed", () => {
      const ast = parse("{;}");
      // The test initiates a sub-traverse from program. During the BlockStatement is traversed,
      // the EmptyStatement visitor will be called and the unshiftContainer will change the
      // traversal context of the BlockStatement to that of Program which has an EmptyStatement
      // visitor. If the traversal context is not restored after `enter` hook is executed,
      // the `BlockStatement:exit` visitor will be run twice: one in the sub-traverse and the other
      // in the top level traverse.
      let blockStatementVisitedCounter = 0;
      traverse(ast, {
        noScope: true,
        Program(path) {
          path.traverse({
            noScope: true,
            EmptyStatement: {
              enter(path) {
                path.parentPath.parentPath.unshiftContainer("body", [
                  t.numericLiteral(0),
                ]);
              },
            },
          });
        },
        BlockStatement: {
          exit() {
            ++blockStatementVisitedCounter;
          },
        },
      });
      expect(blockStatementVisitedCounter).toBe(1);
    });
    it("regression - #12570", () => {
      const logs = [];

      const ast = parse(
        `
          import { Foo } from './Foo'
          import { Bar } from './Bar'
        `,
        { sourceType: "module" },
      );
      traverse(ast, {
        Program(path) {
          path.traverse({
            ImportDeclaration: {
              enter(path) {
                logs.push(["ENTER", path.node.source.value]);
                if (path.node.source.value === "./Bar") {
                  path.parentPath.get(path.listKey);
                }
              },
              exit(path) {
                logs.push(["EXIT", path.node.source.value]);
              },
            },
          });
        },
      });

      expect(logs).toEqual([
        ["ENTER", "./Foo"],
        ["EXIT", "./Foo"],
        ["ENTER", "./Bar"],
        ["EXIT", "./Bar"],
      ]);
    });
  });
  describe("path.stop()", () => {
    it("should stop the traversal when a grand child is stopped", () => {
      const ast = parse("f;g;");

      let visitedCounter = 0;
      traverse(ast, {
        noScope: true,
        Identifier(path) {
          visitedCounter += 1;
          path.stop();
        },
      });

      expect(visitedCounter).toBe(1);
    });

    it("can be reverted in the exit listener of the parent whose child is stopped", () => {
      const ast = parse("f;g;");

      let visitedCounter = 0;
      traverse(ast, {
        noScope: true,
        Identifier(path) {
          visitedCounter += 1;
          path.stop();
        },
        ExpressionStatement: {
          exit(path) {
            path.shouldStop = false;
            path.shouldSkip = false;
          },
        },
      });

      expect(visitedCounter).toBe(2);
    });

    it("should not affect root traversal", () => {
      const ast = parse("f;g;");

      let visitedCounter = 0;
      let programShouldStop;
      traverse(ast, {
        noScope: true,
        Program(path) {
          path.traverse({
            noScope: true,
            Identifier(path) {
              visitedCounter += 1;
              path.stop();
            },
          });
          programShouldStop = path.shouldStop;
        },
      });

      expect(visitedCounter).toBe(1);
      expect(programShouldStop).toBe(false);
    });
  });
  describe("traverse.explode", () => {
    describe("deprecated types and aliases", () => {
      beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation(() => {});
      });
      afterEach(() => {
        console.warn.mockClear();
      });
      afterAll(() => {
        console.warn.mockRestore();
      });
      it("should warn for deprecated node types", function testFn1() {
        const visitNumericLiteral = () => {};
        const visitor = {
          NumberLiteral: visitNumericLiteral,
        };
        traverse.explode(visitor);
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringMatching(
            /Visitor `NumberLiteral` has been deprecated, please migrate to `NumericLiteral`[^]+at.+testFn1/,
          ),
        );
        expect(visitor).toHaveProperty("NumericLiteral.enter", [
          visitNumericLiteral,
        ]);
      });

      it("should warn for deprecated aliases", function testFn2() {
        const visitImportOrExportDeclaration = () => {};
        const visitor = {
          ModuleDeclaration: visitImportOrExportDeclaration,
        };
        traverse.explode(visitor);
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringMatching(
            /Visitor `ModuleDeclaration` has been deprecated, please migrate to `ImportOrExportDeclaration`[^]+at.+testFn2/,
          ),
        );
        expect(visitor).toHaveProperty("ImportDeclaration.enter", [
          visitImportOrExportDeclaration,
        ]);
      });

      it("should not warn deprecations if usage comes from a @babel/* package", () => {
        const visitImportOrExportDeclaration = () => {};
        const visitor = {
          ModuleDeclaration: visitImportOrExportDeclaration,
        };
        callFromAtBabelPackage(traverse.explode, visitor);
        expect(console.warn).not.toHaveBeenCalled();
        expect(visitor).toHaveProperty("ImportDeclaration.enter", [
          visitImportOrExportDeclaration,
        ]);
      });
    });
  });
});
