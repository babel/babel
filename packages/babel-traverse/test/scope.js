import traverse, { NodePath } from "../lib";
import { parse } from "@babel/parser";
import * as t from "@babel/types";

function getPath(code, options) {
  const ast =
    typeof code === "string" ? parse(code, options) : createNode(code);
  let path;
  traverse(ast, {
    Program: function(_path) {
      path = _path;
      _path.stop();
    },
  });
  return path;
}

function getIdentifierPath(code) {
  const ast = parse(code);
  let nodePath;
  traverse(ast, {
    Identifier: function(path) {
      nodePath = path;
      path.stop();
    },
  });

  return nodePath;
}

function createNode(node) {
  const ast = t.file(t.program(Array.isArray(node) ? node : [node]));

  // This puts the path into the cache internally
  // We afterwards traverse ast, as we need to start traversing
  // at the File node and not the Program node
  NodePath.get({
    hub: {
      buildError: (_, msg) => new Error(msg),
    },
    parentPath: null,
    parent: ast,
    container: ast,
    key: "program",
  }).setContext();

  return ast;
}

describe("scope", () => {
  describe("binding paths", () => {
    it("function declaration id", function() {
      expect(
        getPath("function foo() {}").scope.getBinding("foo").path.type,
      ).toBe("FunctionDeclaration");
    });

    it("function expression id", function() {
      expect(
        getPath("(function foo() {})")
          .get("body")[0]
          .get("expression")
          .scope.getBinding("foo").path.type,
      ).toBe("FunctionExpression");
    });

    it("function param", function() {
      expect(
        getPath("(function (foo) {})")
          .get("body")[0]
          .get("expression")
          .scope.getBinding("foo").path.type,
      ).toBe("Identifier");
    });

    describe("function parameter expression", function() {
      it("should not have visibility of declarations inside function body", () => {
        expect(
          getPath(
            `var a = "outside"; (function foo(b = a) { let a = "inside" })`,
          )
            .get("body.1.expression.params.0")
            .scope.getBinding("a").path.node.init.value,
        ).toBe("outside");
      });
      it("should have visibility on parameter bindings", () => {
        expect(
          getPath(`var a = "outside"; (function foo(b = a, a = "inside") {})`)
            .get("body.1.expression.params.0")
            .scope.getBinding("a").path.node.right.value,
        ).toBe("inside");
      });
    });

    it("variable declaration", function() {
      expect(getPath("var foo = null;").scope.getBinding("foo").path.type).toBe(
        "VariableDeclarator",
      );
      expect(
        getPath("var { foo } = null;").scope.getBinding("foo").path.type,
      ).toBe("VariableDeclarator");
      expect(
        getPath("var [ foo ] = null;").scope.getBinding("foo").path.type,
      ).toBe("VariableDeclarator");
      expect(
        getPath("var { bar: [ foo ] } = null;").scope.getBinding("foo").path
          .type,
      ).toBe("VariableDeclarator");
    });

    it("declare var", function() {
      expect(
        getPath("declare var foo;", { plugins: ["flow"] }).scope.getBinding(
          "foo",
        ).path.type,
      ).toBe("DeclareVariable");
    });

    it("declare function", function() {
      expect(
        getPath("declare function foo(): void;", {
          plugins: ["flow"],
        }).scope.getBinding("foo").path.type,
      ).toBe("DeclareFunction");
    });

    it("declare module", function() {
      expect(
        getPath("declare module foo {};", {
          plugins: ["flow"],
        }).scope.getBinding("foo").path.type,
      ).toBe("DeclareModule");
    });

    it("declare type alias", function() {
      expect(
        getPath("declare type foo = string;", {
          plugins: ["flow"],
        }).scope.getBinding("foo").path.type,
      ).toBe("DeclareTypeAlias");
    });

    it("declare opaque type", function() {
      expect(
        getPath("declare opaque type foo;", {
          plugins: ["flow"],
        }).scope.getBinding("foo").path.type,
      ).toBe("DeclareOpaqueType");
    });

    it("declare interface", function() {
      expect(
        getPath("declare interface Foo {};", {
          plugins: ["flow"],
        }).scope.getBinding("Foo").path.type,
      ).toBe("DeclareInterface");
    });

    it("type alias", function() {
      expect(
        getPath("type foo = string;", {
          plugins: ["flow"],
        }).scope.getBinding("foo").path.type,
      ).toBe("TypeAlias");
    });

    it("opaque type alias", function() {
      expect(
        getPath("opaque type foo = string;", {
          plugins: ["flow"],
        }).scope.getBinding("foo").path.type,
      ).toBe("OpaqueType");
    });

    it("interface", function() {
      expect(
        getPath("interface Foo {};", {
          plugins: ["flow"],
        }).scope.getBinding("Foo").path.type,
      ).toBe("InterfaceDeclaration");
    });

    it("import type", function() {
      expect(
        getPath("import type {Foo} from 'foo';", {
          plugins: ["flow"],
        }).scope.getBinding("Foo").path.type,
      ).toBe("ImportSpecifier");
    });

    it("variable constantness", function() {
      expect(getPath("var a = 1;").scope.getBinding("a").constant).toBe(true);
      expect(getPath("var a = 1; a = 2;").scope.getBinding("a").constant).toBe(
        false,
      );
      expect(getPath("var a = 1, a = 2;").scope.getBinding("a").constant).toBe(
        false,
      );
      expect(
        getPath("var a = 1; var a = 2;").scope.getBinding("a").constant,
      ).toBe(false);
    });

    it("purity", function() {
      expect(
        getPath("({ x: 1 })")
          .get("body")[0]
          .get("expression")
          .isPure(),
      ).toBeTruthy();
      expect(
        getPath("`${a}`")
          .get("body")[0]
          .get("expression")
          .isPure(),
      ).toBeFalsy();
      expect(
        getPath("let a = 1; `${a}`")
          .get("body")[1]
          .get("expression")
          .isPure(),
      ).toBeTruthy();
      expect(
        getPath("let a = 1; `${a++}`")
          .get("body")[1]
          .get("expression")
          .isPure(),
      ).toBeFalsy();
      expect(
        getPath("tagged`foo`")
          .get("body")[0]
          .get("expression")
          .isPure(),
      ).toBeFalsy();
      expect(
        getPath("String.raw`foo`")
          .get("body")[0]
          .get("expression")
          .isPure(),
      ).toBeTruthy();
    });

    test("label", function() {
      expect(getPath("foo: { }").scope.getBinding("foo")).toBeUndefined();
      expect(getPath("foo: { }").scope.getLabel("foo").type).toBe(
        "LabeledStatement",
      );
      expect(getPath("foo: { }").scope.getLabel("toString")).toBeUndefined();

      expect(
        getPath(
          `
      foo: { }
    `,
        ).scope.generateUid("foo"),
      ).toBe("_foo");
    });

    test("generateUid collision check with labels", function() {
      expect(
        getPath(
          `
      _foo: { }
    `,
        ).scope.generateUid("foo"),
      ).toBe("_foo2");

      expect(
        getPath(
          `
      _foo: { }
      _foo1: { }
      _foo2: { }
    `,
        ).scope.generateUid("foo"),
      ).toBe("_foo3");
    });

    it("reference paths", function() {
      const path = getIdentifierPath("function square(n) { return n * n}");
      const referencePaths = path.context.scope.bindings.n.referencePaths;
      expect(referencePaths).toHaveLength(2);
      expect(referencePaths[0].node.loc.start).toEqual({
        line: 1,
        column: 28,
      });
      expect(referencePaths[1].node.loc.start).toEqual({
        line: 1,
        column: 32,
      });
    });

    it("class identifier available in class scope after crawl", function() {
      const path = getPath("class a { build() { return new a(); } }");

      path.scope.crawl();

      let referencePaths = path.scope.bindings.a.referencePaths;
      expect(referencePaths).toHaveLength(1);

      referencePaths = path.get("body[0]").scope.bindings.a.referencePaths;
      expect(referencePaths).toHaveLength(1);

      expect(path.scope.bindings.a).toBe(path.get("body[0]").scope.bindings.a);
    });
  });

  describe("duplicate bindings", () => {
    /*
     * These tests do not use the parser as the parser has
     * its own scope tracking and we want to test the scope tracking
     * of traverse here and see if it handles duplicate bindings correctly
     */
    describe("catch", () => {
      // try {} catch (e) { let e; }
      const createTryCatch = function(kind) {
        return t.tryStatement(
          t.blockStatement([]),
          t.catchClause(
            t.identifier("e"),
            t.blockStatement([
              t.variableDeclaration(kind, [
                t.variableDeclarator(t.identifier("e"), t.stringLiteral("1")),
              ]),
            ]),
          ),
        );
      };
      ["let", "const"].forEach(name => {
        it(name, () => {
          const ast = createTryCatch(name);

          expect(() => getPath(ast)).toThrowErrorMatchingSnapshot();
        });
      });

      it("var", () => {
        const ast = createTryCatch("var");

        expect(() => getPath(ast)).not.toThrow();
      });
    });

    ["let", "const"].forEach(name => {
      it(`${name} and function in sub scope`, () => {
        const ast = [
          t.variableDeclaration(name, [
            t.variableDeclarator(t.identifier("foo")),
          ]),
          t.blockStatement([
            t.functionDeclaration(
              t.identifier("foo"),
              [],
              t.blockStatement([]),
            ),
          ]),
        ];

        expect(() => getPath(ast)).not.toThrow();
      });
    });

    describe("global", () => {
      // node1, node2, success
      // every line will run 2 tests `node1;node2;` and `node2;node1;`
      // unless node1 === node2
      const cases = [
        ["const", "let", false],

        ["const", "const", false],
        ["const", "function", false],
        ["const", "class", false],
        ["const", "var", false],

        ["let", "let", false],
        ["let", "class", false],
        ["let", "function", false],
        ["let", "var", false],

        //["var", "class", true],
        ["var", "function", true],
        ["var", "var", true],

        ["class", "function", false],
      ];

      const createNode = function(kind) {
        switch (kind) {
          case "let":
          case "const":
          case "var":
            return t.variableDeclaration(kind, [
              t.variableDeclarator(t.identifier("foo")),
            ]);
          case "class":
            return t.classDeclaration(
              t.identifier("foo"),
              null,
              t.classBody([]),
            );
          case "function":
            return t.functionDeclaration(
              t.identifier("foo"),
              [],
              t.blockStatement([]),
            );
        }
      };

      const createAST = function(kind1, kind2) {
        return [createNode(kind1), createNode(kind2)];
      };

      for (const [kind1, kind2, success] of cases) {
        it(`${kind1}/${kind2}`, () => {
          const ast = createAST(kind1, kind2);

          if (success) {
            expect(() => getPath(ast)).not.toThrow();
          } else {
            expect(() => getPath(ast)).toThrowErrorMatchingSnapshot();
          }
        });

        if (kind1 !== kind2) {
          //todo: remove the if whitelist
          if (kind1 === "const" && (kind2 === "function" || kind2 === "var")) {
            continue;
          }
          it(`${kind2}/${kind1}`, () => {
            const ast = createAST(kind2, kind1);

            if (success) {
              expect(() => getPath(ast)).not.toThrow();
            } else {
              expect(() => getPath(ast)).toThrowErrorMatchingSnapshot();
            }
          });
        }
      }
    });
  });
});
