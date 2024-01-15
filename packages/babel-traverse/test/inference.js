import { parse } from "@babel/parser";
import * as t from "@babel/types";

import _traverse from "../lib/index.js";
const traverse = _traverse.default || _traverse;

function getPath(code, options) {
  const ast = parse(code, options);
  let path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    },
  });
  return path;
}

function flowGetPath(code) {
  return getPath(code, { plugins: ["flow"] });
}

function tsGetPath(code) {
  return getPath(code, { plugins: ["typescript"] });
}

describe("inference with Flow", function () {
  describe("baseTypeStrictlyMatches", function () {
    it("should work with null", function () {
      const path = flowGetPath("var x = null; x === null")
        .get("body")[1]
        .get("expression");
      const left = path.get("left");
      const right = path.get("right");
      const strictMatch = left.baseTypeStrictlyMatches(right);

      expect(strictMatch).toBeTruthy();
    });

    it("should work with numbers", function () {
      const path = flowGetPath("var x = 1; x === 2")
        .get("body")[1]
        .get("expression");
      const left = path.get("left");
      const right = path.get("right");
      const strictMatch = left.baseTypeStrictlyMatches(right);

      expect(strictMatch).toBeTruthy();
    });

    it("should bail when type changes", function () {
      const path = flowGetPath(
        "var x = 1; if (foo) x = null;else x = 3; x === 2",
      )
        .get("body")[2]
        .get("expression");
      const left = path.get("left");
      const right = path.get("right");

      const strictMatch = left.baseTypeStrictlyMatches(right);

      expect(strictMatch).toBeFalsy();
    });

    it("should differentiate between null and undefined", function () {
      const path = flowGetPath("var x; x === null")
        .get("body")[1]
        .get("expression");
      const left = path.get("left");
      const right = path.get("right");
      const strictMatch = left.baseTypeStrictlyMatches(right);

      expect(strictMatch).toBeFalsy();
    });
  });
  describe("getTypeAnnotation", function () {
    it("should infer from type cast", function () {
      const path = flowGetPath("(x: number)").get("body")[0].get("expression");
      expect(t.isNumberTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer string from template literal", function () {
      const path = flowGetPath("`hey`").get("body")[0].get("expression");
      expect(t.isStringTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer number from +x", function () {
      const path = flowGetPath("+x").get("body")[0].get("expression");
      expect(t.isNumberTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer T from new T", function () {
      const path = flowGetPath("new T").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "T",
      ).toBeTruthy();
    });
    it("should infer number from ++x", function () {
      const path = flowGetPath("++x").get("body")[0].get("expression");
      expect(t.isNumberTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer number from --x", function () {
      const path = flowGetPath("--x").get("body")[0].get("expression");
      expect(t.isNumberTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer void from void x", function () {
      const path = flowGetPath("void x").get("body")[0].get("expression");
      expect(t.isVoidTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer string from typeof x", function () {
      const path = flowGetPath("typeof x").get("body")[0].get("expression");
      expect(t.isStringTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer boolean from !x", function () {
      const path = flowGetPath("!x").get("body")[0].get("expression");
      expect(t.isBooleanTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer type of sequence expression", function () {
      const path = flowGetPath("a,1").get("body")[0].get("expression");
      expect(t.isNumberTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer type of logical expression", function () {
      const path = flowGetPath("'a' && 1").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isUnionTypeAnnotation(type)).toBeTruthy();
      expect(t.isStringTypeAnnotation(type.types[0])).toBeTruthy();
      expect(t.isNumberTypeAnnotation(type.types[1])).toBeTruthy();
    });
    it("should infer type of conditional expression", function () {
      const path = flowGetPath("q ? true : 0").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isUnionTypeAnnotation(type)).toBeTruthy();
      expect(t.isBooleanTypeAnnotation(type.types[0])).toBeTruthy();
      expect(t.isNumberTypeAnnotation(type.types[1])).toBeTruthy();
    });
    it("should infer RegExp from RegExp literal", function () {
      const path = flowGetPath("/.+/").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "RegExp",
      ).toBeTruthy();
    });
    it("should infer Object from object expression", function () {
      const path = flowGetPath("({ a: 5 })").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "Object",
      ).toBeTruthy();
    });
    it("should infer Array from array expression", function () {
      const path = flowGetPath("[ 5 ]").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "Array",
      ).toBeTruthy();
    });
    it("should infer Function from function", function () {
      const path = flowGetPath("(function (): string {})")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "Function",
      ).toBeTruthy();
    });
    it("should infer call return type using function", function () {
      const path = flowGetPath("(function (): string {})()")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isStringTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer call return type using async function", function () {
      const path = flowGetPath("(async function (): string {})()")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "Promise",
      ).toBeTruthy();
    });
    it("should infer call return type using async generator function", function () {
      const path = flowGetPath("(async function * (): string {})()")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "AsyncIterator",
      ).toBeTruthy();
    });
    it("should infer number from x/y", function () {
      const path = flowGetPath("x/y").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer boolean from x instanceof y", function () {
      const path = flowGetPath("x instanceof y")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isBooleanTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer number from 1 + 2", function () {
      const path = flowGetPath("1 + 2").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer string|number from x + y", function () {
      const path = flowGetPath("x + y").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isUnionTypeAnnotation(type)).toBeTruthy();
      expect(t.isStringTypeAnnotation(type.types[0])).toBeTruthy();
      expect(t.isNumberTypeAnnotation(type.types[1])).toBeTruthy();
    });
    it("should infer type of tagged template literal", function () {
      const path = flowGetPath("(function (): RegExp {}) `hey`")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "RegExp",
      ).toBeTruthy();
    });
    it("should infer constant identifier", function () {
      const path = flowGetPath("const x = 0; x").get("body.1.expression");
      const type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer indirect constant identifier", function () {
      const path = flowGetPath("const x = 0; const y = x; y").get(
        "body.2.expression",
      );
      const type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer identifier type from if statement (===)", function () {
      const path = flowGetPath(
        `function test(x) {
        if (x === true) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      const type = path.getTypeAnnotation();
      expect(t.isBooleanTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer identifier type from if statement (typeof)", function () {
      let path = flowGetPath(
        `function test(x) {
        if (typeof x == 'string') x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      let type = path.getTypeAnnotation();
      expect(t.isStringTypeAnnotation(type)).toBeTruthy();
      path = flowGetPath(
        `function test(x) {
        if (typeof x === 'number') x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer identifier type from if statement (&&)", function () {
      let path = flowGetPath(
        `function test(x) {
        if (typeof x == 'string' && x === 3) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      let type = path.getTypeAnnotation();
      expect(t.isUnionTypeAnnotation(type)).toBeTruthy();
      expect(t.isStringTypeAnnotation(type.types[0])).toBeTruthy();
      expect(t.isNumberTypeAnnotation(type.types[1])).toBeTruthy();
      path = flowGetPath(
        `function test(x) {
        if (true && x === 3) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
      path = flowGetPath(
        `function test(x) {
        if (x === 'test' && true) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      type = path.getTypeAnnotation();
      expect(t.isStringTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer identifier type from if statement (||)", function () {
      const path = flowGetPath(
        `function test(x) {
        if (typeof x == 'string' || x === 3) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      const type = path.getTypeAnnotation();
      expect(t.isAnyTypeAnnotation(type)).toBeTruthy();
    });
    it("should not infer identifier type from incorrect binding", function () {
      const path = flowGetPath(
        `function outer(x) {
        if (x === 3) {
          function inner(x) {
            x;
          }
        }
      }`,
      ).get("body.0.body.body.0.consequent.body.0.body.body.0.expression");
      const type = path.getTypeAnnotation();
      expect(t.isAnyTypeAnnotation(type)).toBeTruthy();
    });
    it("should not cause a stack overflow when two variable depend on each other", function () {
      const path = flowGetPath(`
        var b, c;
        while (0) {
          c = 1;
          b = c;
        }
        c = b;
      `).get("body.2.expression");

      expect(path.toString()).toBe("c = b");

      // Note: this could technically be "number | void", but the cycle detection
      // logic just bails out to "any" to avoid infinite loops.
      expect(path.getTypeAnnotation()).toEqual({ type: "AnyTypeAnnotation" });
    });
  });
  describe(`isGenericType("Array")`, () => {
    it.each([
      "var x = Array()",
      "var x = Array.from([])",
      "var x = Object.keys({})",
      "var x = Object.values({})",
      "var x = Object.entries({})",
      "var x = new Array",
      "const x = [];",
      "const x = (function (): Array<T> { return []; })()",
      "const x = (function (): T[] { return []; })()",
      "const x = (v: Array<T>)",
      "const x = ({}, [])",
      "let x = (y: [number, string])",
      "var x = true ? a() : b(); function a(): Array<number> {}; function b(): Array<number> {}",
      "var x = a() || b(); function a(): Array<number> {}; function b(): Array<number> {}",
    ])(`NodePath(%p).isGenericType("Array") should be true`, input => {
      const path = flowGetPath(input).get("body.0.declarations.0");
      expect(path.isGenericType("Array")).toBe(true);
    });
    it.each([
      "x = Array()",
      "x = Array.from([])",
      "x = Object.keys({})",
      "x = Object.values({})",
      "x = Object.entries({})",
      "x = new Array",
      "x = [];",
      "x = (function (): Array<T> { return []; })()",
      "x = (function (): T[] { return []; })()",
      "x = (v: Array<T>)",
      "x = ({}, [])",
      "x = (y: [number, string])",
    ])(`NodePath(%p).isGenericType("Array") should be true`, input => {
      const path = flowGetPath(input).get("body.0.expression");
      expect(path.isGenericType("Array")).toBe(true);
    });
    it.each(["const x = ({}, [])"])(
      `With { createParenthesizedExpressions: true}, NodePath(%p).isGenericType("Array") should be true`,
      input => {
        const path = getPath(input, {
          plugins: ["flow"],
          createParenthesizedExpressions: true,
        }).get("body.0.declarations.0");
        expect(path.isGenericType("Array")).toBe(true);
      },
    );
  });
});

describe("inference with TypeScript", function () {
  describe("baseTypeStrictlyMatches", function () {
    it("should work with null", function () {
      const path = tsGetPath("var x = null; x === null")
        .get("body")[1]
        .get("expression");
      const left = path.get("left");
      const right = path.get("right");
      const strictMatch = left.baseTypeStrictlyMatches(right);

      expect(strictMatch).toBeTruthy();
    });

    it("should work with numbers", function () {
      const path = tsGetPath("var x = 1; x === 2")
        .get("body")[1]
        .get("expression");
      const left = path.get("left");
      const right = path.get("right");
      const strictMatch = left.baseTypeStrictlyMatches(right);

      expect(strictMatch).toBeTruthy();
    });

    it("should bail when type changes", function () {
      const path = tsGetPath("var x = 1; if (foo) x = null;else x = 3; x === 2")
        .get("body")[2]
        .get("expression");
      const left = path.get("left");
      const right = path.get("right");

      const strictMatch = left.baseTypeStrictlyMatches(right);

      expect(strictMatch).toBeFalsy();
    });

    it("should differentiate between null and undefined", function () {
      const path = tsGetPath("var x; x === null")
        .get("body")[1]
        .get("expression");
      const left = path.get("left");
      const right = path.get("right");
      const strictMatch = left.baseTypeStrictlyMatches(right);

      expect(strictMatch).toBeFalsy();
    });
  });
  describe("getTypeAnnotation", function () {
    it("should infer from type cast", function () {
      const path = tsGetPath("x as number").get("body")[0].get("expression");
      expect(t.isTSNumberKeyword(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer from non-null expression", function () {
      const path = tsGetPath("x as number").get("body")[0].get("expression");
      expect(t.isTSNumberKeyword(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer string from template literal", function () {
      const path = tsGetPath("`hey`").get("body")[0].get("expression");
      expect(t.isStringTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer number from +x", function () {
      const path = tsGetPath("+x").get("body")[0].get("expression");
      expect(t.isNumberTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer T from new T", function () {
      const path = tsGetPath("new T").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "T",
      ).toBeTruthy();
    });
    it("should infer number from ++x", function () {
      const path = tsGetPath("++x").get("body")[0].get("expression");
      expect(t.isNumberTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer number from --x", function () {
      const path = tsGetPath("--x").get("body")[0].get("expression");
      expect(t.isNumberTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer void from void x", function () {
      const path = tsGetPath("void x").get("body")[0].get("expression");
      expect(t.isVoidTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer string from typeof x", function () {
      const path = tsGetPath("typeof x").get("body")[0].get("expression");
      expect(t.isStringTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer boolean from !x", function () {
      const path = tsGetPath("!x").get("body")[0].get("expression");
      expect(t.isBooleanTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer type of sequence expression", function () {
      const path = tsGetPath("a,1").get("body")[0].get("expression");
      expect(t.isNumberTypeAnnotation(path.getTypeAnnotation())).toBeTruthy();
    });
    it("should infer type of logical expression", function () {
      const path = tsGetPath("'a' && 1").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isUnionTypeAnnotation(type)).toBeTruthy();
      expect(t.isStringTypeAnnotation(type.types[0])).toBeTruthy();
      expect(t.isNumberTypeAnnotation(type.types[1])).toBeTruthy();
    });
    it("should infer type of conditional expression", function () {
      const path = tsGetPath("q ? true : 0").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isUnionTypeAnnotation(type)).toBeTruthy();
      expect(t.isBooleanTypeAnnotation(type.types[0])).toBeTruthy();
      expect(t.isNumberTypeAnnotation(type.types[1])).toBeTruthy();
    });
    it("should infer RegExp from RegExp literal", function () {
      const path = tsGetPath("/.+/").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "RegExp",
      ).toBeTruthy();
    });
    it("should infer Object from object expression", function () {
      const path = tsGetPath("({ a: 5 })").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "Object",
      ).toBeTruthy();
    });
    it("should infer Array from array expression", function () {
      const path = tsGetPath("[ 5 ]").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "Array",
      ).toBeTruthy();
    });
    it("should infer Function from function", function () {
      const path = tsGetPath("(function (): string {})")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "Function",
      ).toBeTruthy();
    });
    it("should infer call return type using function", function () {
      const path = tsGetPath("(function (): string {})()")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(type.type).toBe("TSStringKeyword");
    });
    it("should infer call return type using async function", function () {
      const path = tsGetPath("(async function (): string {})()")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "Promise",
      ).toBeTruthy();
    });
    it("should infer call return type using async generator function", function () {
      const path = tsGetPath("(async function * (): string {})()")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(
        t.isGenericTypeAnnotation(type) && type.id.name === "AsyncIterator",
      ).toBeTruthy();
    });
    it("should infer number from x/y", function () {
      const path = tsGetPath("x/y").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer boolean from x instanceof y", function () {
      const path = tsGetPath("x instanceof y").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isBooleanTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer number from 1 + 2", function () {
      const path = tsGetPath("1 + 2").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer string|number from x + y", function () {
      const path = tsGetPath("x + y").get("body")[0].get("expression");
      const type = path.getTypeAnnotation();
      expect(t.isUnionTypeAnnotation(type)).toBeTruthy();
      expect(t.isStringTypeAnnotation(type.types[0])).toBeTruthy();
      expect(t.isNumberTypeAnnotation(type.types[1])).toBeTruthy();
    });
    it("should infer type of tagged template literal", function () {
      const path = tsGetPath("(function (): RegExp {}) `hey`")
        .get("body")[0]
        .get("expression");
      const type = path.getTypeAnnotation();
      expect(type.type).toBe("TSTypeReference");
      expect(type.typeName.name).toBe("RegExp");
    });
    it("should infer constant identifier", function () {
      const path = tsGetPath("const x = 0; x").get("body.1.expression");
      const type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer indirect constant identifier", function () {
      const path = tsGetPath("const x = 0; const y = x; y").get(
        "body.2.expression",
      );
      const type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer identifier type from if statement (===)", function () {
      const path = tsGetPath(
        `function test(x) {
        if (x === true) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      const type = path.getTypeAnnotation();
      expect(t.isBooleanTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer identifier type from if statement (typeof)", function () {
      let path = tsGetPath(
        `function test(x) {
        if (typeof x == 'string') x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      let type = path.getTypeAnnotation();
      expect(t.isStringTypeAnnotation(type)).toBeTruthy();
      path = tsGetPath(
        `function test(x) {
        if (typeof x === 'number') x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer identifier type from if statement (&&)", function () {
      let path = tsGetPath(
        `function test(x) {
        if (typeof x == 'string' && x === 3) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      let type = path.getTypeAnnotation();
      expect(t.isUnionTypeAnnotation(type)).toBeTruthy();
      expect(t.isStringTypeAnnotation(type.types[0])).toBeTruthy();
      expect(t.isNumberTypeAnnotation(type.types[1])).toBeTruthy();
      path = tsGetPath(
        `function test(x) {
        if (true && x === 3) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      type = path.getTypeAnnotation();
      expect(t.isNumberTypeAnnotation(type)).toBeTruthy();
      path = tsGetPath(
        `function test(x) {
        if (x === 'test' && true) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      type = path.getTypeAnnotation();
      expect(t.isStringTypeAnnotation(type)).toBeTruthy();
    });
    it("should infer identifier type from if statement (||)", function () {
      const path = tsGetPath(
        `function test(x) {
        if (typeof x == 'string' || x === 3) x;
      }`,
      ).get("body.0.body.body.0.consequent.expression");
      const type = path.getTypeAnnotation();
      expect(t.isAnyTypeAnnotation(type)).toBeTruthy();
    });
    it("should not infer identifier type from incorrect binding", function () {
      const path = tsGetPath(
        `function outer(x) {
        if (x === 3) {
          function inner(x) {
            x;
          }
        }
      }`,
      ).get("body.0.body.body.0.consequent.body.0.body.body.0.expression");
      const type = path.getTypeAnnotation();
      expect(t.isAnyTypeAnnotation(type)).toBeTruthy();
    });
    it("should not cause a stack overflow when two variable depend on each other", function () {
      const path = tsGetPath(`
        var b, c;
        while (0) {
          c = 1;
          b = c;
        }
        c = b;
      `).get("body.2.expression");

      expect(path.toString()).toBe("c = b");

      // Note: this could technically be "number | void", but the cycle detection
      // logic just bails out to "any" to avoid infinite loops.
      expect(path.getTypeAnnotation()).toEqual({ type: "AnyTypeAnnotation" });
    });
  });
  describe(`isGenericType("Array")`, () => {
    it.each([
      "var x = Array()",
      "var x = Array.from([])",
      "var x = Object.keys({})",
      "var x = Object.values({})",
      "var x = Object.entries({})",
      "var x = new Array",
      "const x = [];",
      "const x = (function (): Array<T> { return []; })()",
      "const x = (function (): T[] { return []; })()",
      "const x = (v as Array<T>)",
      "const x = ({}, [])",
      "var x = true ? a() : b(); function a(): Array<number> {}; function b(): Array<number> {}",
      "var x = a() || b(); function a(): Array<number> {}; function b(): Array<number> {}",
      "let x = []!",
    ])(`NodePath(%p).isGenericType("Array") should be true`, input => {
      const path = tsGetPath(input).get("body.0.declarations.0");
      expect(path.isGenericType("Array")).toBe(true);
    });
    it.each([
      "x = Array()",
      "x = Array.from([])",
      "x = Object.keys({})",
      "x = Object.values({})",
      "x = Object.entries({})",
      "x = new Array",
      "x = [];",
      "x = (function (): Array<T> { return []; })()",
      "x = (function (): T[] { return []; })()",
      "x = (v as Array<T>)",
      "x = ({}, [])",
    ])(`NodePath(%p).isGenericType("Array") should be true`, input => {
      const path = tsGetPath(input).get("body.0.expression");
      expect(path.isGenericType("Array")).toBe(true);
    });
    it("should not throw both flow and ts types", () => {
      const path = tsGetPath(
        `const bar = 0 ? mkList() : [];function mkList(): any[] {return [];}`,
      ).get("body.0.declarations.0");
      // TODO: This should be true
      expect(path.isGenericType("Array")).toBe(false);
    });
  });
});
