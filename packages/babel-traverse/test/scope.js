import traverse from "../lib";
import { parse } from "@babel/parser";

function getPath(code, options) {
  const ast = parse(code, options);
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

describe("scope", function() {
  describe("binding paths", function() {
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
  });
});
