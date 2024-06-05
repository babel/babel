import {
  describeBabel7,
  describeBabel8,
} from "../../../scripts/repo-utils/index.cjs";
import * as t from "../lib/index.js";
import { parse } from "@babel/parser";

function getBody(program, parseOption = { sourceType: "module" }) {
  return parse(program, parseOption).program.body;
}

describe("retrievers", function () {
  describe("getBindingIdentifiers", function () {
    it.each([
      [
        "variable declarations",
        getBody("var a = 1; let b = 2; const c = 3;"),
        ["a", "b", "c"],
      ],
      [
        "function declarations",
        getBody("function bar() { var baz = 2; }"),
        ["bar"],
      ],
      [
        "function declarations with parameters",
        getBody(
          "function f(a, { b }, c = 1, [{ _: [ d ], ...e }]) { var baz = 2; }",
        ),
        ["f", "a", "c", "b", "e", "d"],
      ],
      [
        "function expressions with parameters",
        getBody(
          "(function f(a, { b }, c = 1, [{ _: [ d ], ...e }]) { var baz = 2; })",
        )[0].expression,
        ["f", "a", "c", "b", "e", "d"],
      ],
      ["class declarations", getBody("class C { a(b) { let c } }")[0], ["C"]],
      [
        "class expressions",
        getBody("(class C { a(b) { let c } })")[0].expression,
        ["C"],
      ],
      [
        "object methods",
        getBody("({ a(b) { let c } })")[0].expression.properties[0],
        ["b"],
      ],
      [
        "class methods",
        getBody("(class { a(b) { let c } })")[0].expression.body.body,
        ["b"],
      ],
      [
        "class private methods",
        getBody("(class { #a(b) { let c } })")[0].expression.body.body,
        ["b"],
      ],
      [
        "for-in statement",
        getBody("for ([{ _: [ d ], ...e }] in rhs);"),
        ["e", "d"],
      ],
      [
        "for-of statement",
        getBody("for ([{ _: [ d ], ...e }] of rhs);"),
        ["e", "d"],
      ],
      ["catch clause", getBody("try { } catch (e) {}")[0].handler, ["e"]],
      ["labeled statement", getBody("label: x"), ["label"]],
      [
        "export named declarations",
        getBody("export const foo = 'foo';"),
        ["foo"],
      ],
      [
        "export function declarations",
        getBody("export function foo() {}"),
        ["foo"],
      ],
      [
        "export default class declarations",
        getBody("export default class foo {}"),
        ["foo"],
      ],
      [
        "export default referenced identifiers",
        getBody("export default foo"),
        [],
      ],
      ["export all declarations", getBody("export * from 'x'"), []],
      [
        "export all as namespace declarations",
        getBody("export * as ns from 'x'"),
        [], // exported bindings are not associated with declarations
      ],
      [
        "export namespace specifiers",
        getBody("export * as ns from 'x'")[0].specifiers,
        ["ns"],
      ],
      [
        "object patterns",
        getBody("const { a, b: { ...c } = { d } } = {}"),
        ["a", "c"],
      ],
      [
        "array patterns",
        getBody("var [ a, ...{ b, ...c } ] = {}"),
        ["a", "b", "c"],
      ],
      ["unary expression", getBody("void x")[0].expression, ["x"]],
      ["update expression", getBody("++x")[0].expression, ["x"]],
      ["assignment expression", getBody("x ??= 1")[0].expression, ["x"]],
    ])("%s", (_, program, bindingNames) => {
      const ids = t.getBindingIdentifiers(program);
      expect(Object.keys(ids)).toEqual(bindingNames);
    });
  });
  describe("getBindingIdentifiers(%, /* duplicates */ true)", function () {
    it.each([
      ["variable declarations", getBody("var a = 1, a = 2"), { a: 2 }],
      [
        "function declarations with parameters",
        getBody("function f(f) { var f = 1; }"),
        { f: 2 },
      ],
    ])("%s", (_, program, expected) => {
      const ids = t.getBindingIdentifiers(program, true);
      for (const name of Object.keys(ids)) {
        ids[name] = Array.isArray(ids[name]) ? ids[name].length : 1;
      }
      expect(ids).toEqual(expected);
    });
  });
  describe("getOuterBindingIdentifiers", function () {
    it.each([
      [
        "variable declarations",
        getBody("var a = 1; let b = 2; const c = 3;"),
        ["a", "b", "c"],
      ],
      [
        "function declarations",
        getBody("function bar() { var baz = 2; }"),
        ["bar"],
      ],
      [
        "function declarations with parameters",
        getBody(
          "function f(a, { b }, c = 1, [{ _: [ d ], ...e }]) { var baz = 2; }",
        ),
        ["f"],
      ],
      [
        "function expressions with parameters",
        getBody(
          "(function f(a, { b }, c = 1, [{ _: [ d ], ...e }]) { var baz = 2; })",
        )[0].expression,
        [],
      ],
      ["class declarations", getBody("class C { a(b) { let c } }")[0], ["C"]],
      [
        "object methods",
        getBody("({ a(b) { let c } })")[0].expression.properties[0],
        ["b"],
      ],
      [
        "class methods",
        getBody("(class { a(b) { let c } })")[0].expression.body.body,
        ["b"],
      ],
      [
        "class private methods",
        getBody("(class { #a(b) { let c } })")[0].expression.body.body,
        ["b"],
      ],
      [
        "for-in statement",
        getBody("for ([{ _: [ d ], ...e }] in rhs);"),
        ["e", "d"],
      ],
      [
        "for-of statement",
        getBody("for ([{ _: [ d ], ...e }] of rhs);"),
        ["e", "d"],
      ],
      ["catch clause", getBody("try { } catch (e) {}")[0].handler, ["e"]],
      ["labeled statement", getBody("label: x"), ["label"]],
      [
        "export named declarations",
        getBody("export const foo = 'foo';"),
        ["foo"],
      ],
      [
        "export function declarations",
        getBody("export function foo() {}"),
        ["foo"],
      ],
      [
        "export default class declarations",
        getBody("export default class foo {}"),
        ["foo"],
      ],
      [
        "export default referenced identifiers",
        getBody("export default foo"),
        [],
      ],
      ["export all declarations", getBody("export * from 'x'"), []],
      [
        "export all as namespace declarations",
        getBody("export * as ns from 'x'"),
        [], // exported bindings are not associated with declarations
      ],
      [
        "export namespace specifiers",
        getBody("export * as ns from 'x'")[0].specifiers,
        ["ns"],
      ],
      [
        "object patterns",
        getBody("const { a, b: { ...c } = { d } } = {}"),
        ["a", "c"],
      ],
      [
        "array patterns",
        getBody("var [ a, ...{ b, ...c } ] = {}"),
        ["a", "b", "c"],
      ],
      ["unary expression", getBody("void x")[0].expression, ["x"]],
      ["update expression", getBody("++x")[0].expression, ["x"]],
      ["assignment expression", getBody("x ??= 1")[0].expression, ["x"]],
    ])("%s", (_, program, bindingNames) => {
      const ids = t.getOuterBindingIdentifiers(program);
      expect(Object.keys(ids)).toEqual(bindingNames);
    });
  });
  describeBabel7("getOuterBindingIdentifiers - Babel 7", function () {
    it.each([
      [
        "class expressions",
        getBody("(class C { a(b) { let c } })")[0].expression,
        ["C"],
      ],
    ])("%s", (_, program, bindingNames) => {
      const ids = t.getOuterBindingIdentifiers(program);
      expect(Object.keys(ids)).toEqual(bindingNames);
    });
  });
  describeBabel8("getOuterBindingIdentifiers - Babel 8", function () {
    it.each([
      [
        "class expressions",
        getBody("(class C { a(b) { let c } })")[0].expression,
        [],
      ],
    ])("%s", (_, program, bindingNames) => {
      const ids = t.getOuterBindingIdentifiers(program);
      expect(Object.keys(ids)).toEqual(bindingNames);
    });
  });
  describe("getBindingIdentifiers(%, false, false, /* newBindingsOnly */ true)", function () {
    it.each([
      ["unary expression", getBody("void x")[0].expression, []],
      ["update expression", getBody("++x")[0].expression, []],
      ["assignment expression", getBody("x ??= 1")[0].expression, []],
    ])("%s", (_, program, bindingNames) => {
      const ids = t.getBindingIdentifiers(program, false, false, true);
      expect(Object.keys(ids)).toEqual(bindingNames);
    });
  });
  describe("getAssignmentIdentifiers", function () {
    it.each([
      [
        "assignment expression",
        getBody(
          "[a, { b }, c = 1, [{ _: [ d ], ...e }], ...f] = [g, h] = [];",
        )[0].expression,
        ["f", "e", "d", "c", "b", "a"],
      ],
      [
        "assignment expression",
        getBody(
          "[a, { b }, c = 1, [{ _: [ d ], ...e }], ...f] = [g, h] = [];",
        )[0].expression.right,
        ["h", "g"],
      ],
      [
        "for-in statement",
        getBody(
          "for ([a, { b }, c = 1, [{ _: [ d ], ...e }], ...f] in [[]]);",
        )[0],
        ["f", "e", "d", "c", "b", "a"],
      ],
      [
        "for-of statement",
        getBody(
          "for ([a, { b }, c = 1, [{ _: [ d ], ...e }], ...f] of [[]]);",
        )[0],
        ["f", "e", "d", "c", "b", "a"],
      ],
      [
        "unary expression",
        getBody("delete x", { sourceType: "script" })[0].expression,
        ["x"],
      ],
      ["update expression", getBody("++x")[0].expression, ["x"]],
      [
        "logical assignment expression",
        getBody("x ??= 1")[0].expression,
        ["x"],
      ],
      [
        "supports `__proto__` as an identifier name",
        getBody("__proto__ = {}")[0].expression,
        ["__proto__"],
      ],
    ])("%s", (_, program, bindingNames) => {
      const ids = t.getAssignmentIdentifiers(program);
      expect(Object.keys(ids)).toEqual(bindingNames);
    });
  });
});
