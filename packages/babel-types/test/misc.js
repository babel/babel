import * as t from "../lib/index.js";
import { parseExpression } from "@babel/parser";

function parseCode(string) {
  return parseExpression(string, {
    allowSuperOutsideMethod: true,
    allowNewTargetOutsideFunction: true,
    allowReturnOutsideFunction: true,
    sourceType: "module",
  });
}

describe("misc helpers", function () {
  describe("matchesPattern", function () {
    it("matches explicitly", function () {
      const ast = parseCode("a.b.c.d");
      expect(t.matchesPattern(ast, "a.b.c.d")).toBeTruthy();
      expect(t.matchesPattern(ast, "a.b.c")).toBe(false);
      expect(t.matchesPattern(ast, "b.c.d")).toBe(false);
      expect(t.matchesPattern(ast, "a.b.c.d.e")).toBe(false);
    });

    it("matches partially", function () {
      const ast = parseCode("a.b.c.d");
      expect(t.matchesPattern(ast, "a.b.c.d", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "a.b.c", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "b.c.d", true)).toBe(false);
      expect(t.matchesPattern(ast, "a.b.c.d.e", true)).toBe(false);
    });

    it("matches string literal expressions", function () {
      const ast = parseCode("a['b'].c.d");
      expect(t.matchesPattern(ast, "a.b.c.d")).toBeTruthy();
      expect(t.matchesPattern(ast, "a.b.c")).toBe(false);
      expect(t.matchesPattern(ast, "b.c.d")).toBe(false);
      expect(t.matchesPattern(ast, "a.b.c.d.e")).toBe(false);
    });

    it("matches string literal expressions partially", function () {
      const ast = parseCode("a['b'].c.d");
      expect(t.matchesPattern(ast, "a.b.c.d", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "a.b.c", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "b.c.d", true)).toBe(false);
      expect(t.matchesPattern(ast, "a.b.c.d.e", true)).toBe(false);
    });

    it("matches this expressions", function () {
      const ast = parseCode("this.a.b.c.d");
      expect(t.matchesPattern(ast, "this.a.b.c.d")).toBeTruthy();
      expect(t.matchesPattern(ast, "this.a.b.c")).toBe(false);
      expect(t.matchesPattern(ast, "this.b.c.d")).toBe(false);
      expect(t.matchesPattern(ast, "this.a.b.c.d.e")).toBe(false);
    });

    it("matches meta properties: import.meta.url", function () {
      const ast = parseCode("import.meta.url");
      expect(t.matchesPattern(ast, "import.meta.url")).toBeTruthy();
      expect(t.matchesPattern(ast, "import.meta")).toBe(false);
      expect(t.matchesPattern(ast, "import.meta.uri")).toBe(false);
      expect(t.matchesPattern(ast, "import.meta.url.toString")).toBe(false);
      expect(t.matchesPattern(ast, "Import.meta")).toBe(false);
      expect(t.matchesPattern(ast, "import.wrongProperty")).toBe(false);
      expect(t.matchesPattern(ast, "import.wrongProperty.url")).toBe(false);
    });

    it("matches meta properties: import.meta.url, partially", function () {
      const ast = parseCode("import.meta.url");
      expect(t.matchesPattern(ast, "import.meta.url", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "import.meta", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "meta.url", true)).toBe(false);
      expect(t.matchesPattern(ast, "import.meta.url.toString", true)).toBe(
        false,
      );
    });

    it("matches meta properties: import.meta", function () {
      const ast = parseCode("import.meta");
      expect(t.matchesPattern(ast, "import.meta")).toBeTruthy();
      expect(t.matchesPattern(ast, "import.meta.uri")).toBe(false);
    });

    it("matches meta properties: import.meta, partially", function () {
      const ast = parseCode("import.meta");
      expect(t.matchesPattern(ast, "import.meta", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "import", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "meta", true)).toBe(false);
    });

    it("matches meta properties: new.target", function () {
      const ast = parseCode("new.target.name");
      expect(t.matchesPattern(ast, "new.target.name")).toBeTruthy();
      expect(t.matchesPattern(ast, "new.target")).toBe(false);
      expect(t.matchesPattern(ast, "new.target.constructor")).toBe(false);
      expect(t.matchesPattern(ast, "new.target.name.toString")).toBe(false);
    });

    it("matches super property access", function () {
      const ast = parseCode("super.property.name");
      expect(t.matchesPattern(ast, "super.property.name")).toBeTruthy();
      expect(t.matchesPattern(ast, "super.property")).toBe(false);
      expect(t.matchesPattern(ast, "super.property.constructor")).toBe(false);
      expect(t.matchesPattern(ast, "super.property.name.toString")).toBe(false);
    });

    it("matches private name", function () {
      const ast = parseCode("(class { #property = this.#property.name })").body
        .body[0].value;
      expect(t.matchesPattern(ast, "this.#property.name")).toBeTruthy();
      expect(t.matchesPattern(ast, "this.#property")).toBe(false);
      expect(t.matchesPattern(ast, "this.#property.constructor")).toBe(false);
      expect(t.matchesPattern(ast, "this.#property.name.toString")).toBe(false);
    });
  });
});
