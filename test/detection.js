var detect = require("../lib/babel/detection");
var assert = require("assert");
var parse  = require("../lib/babel/helpers/parse");

suite("detection", function () {
  var checkSyntax = function (code, name) {
    var ast = parse({
      experimental: true
    }, code);

    assert.ok(detect(ast).syntax[name]);
  };

  test("es5.properties.mutators", function () {
    checkSyntax("var obj = { get foo() {} };", "es5.properties.mutators");
    checkSyntax("var obj = { set foo() {} };", "es5.properties.mutators");
  });

  test("es6.exponentation", function () {
    checkSyntax("x ** 2;", "es6.exponentation");
    checkSyntax("x **= 2;", "es6.exponentation");
  });

  test("es6.blockScoping", function () {
    checkSyntax("let foo;", "es6.blockScoping");
    checkSyntax("let foo = bar;", "es6.blockScoping");
    checkSyntax("const foo = bar;", "es6.blockScoping");
  });

  test("es6.constants", function () {
    checkSyntax("const foo = bar;", "es6.constants");
  });

  test("es6.properties.shorthand", function () {
    checkSyntax("var obj = { foo };", "es6.properties.shorthand");
    checkSyntax("var obj = { foo };", "es6.properties.shorthand");
  });

  test("es6.properties.computed", function () {
    checkSyntax("var obj = { [foo]: bar };", "es6.properties.computed");
    checkSyntax("var obj = { ['foo']: bar };", "es6.properties.computed");
  });

  test("es6.parameters.default", function () {
    checkSyntax("var obj = (foo = bar) => {};", "es6.parameters.default");
    checkSyntax("var obj = function (foo = bar) {};", "es6.parameters.default");
    checkSyntax("function foo(foo = bar) {}", "es6.parameters.default");
  });

  test("es6.arrowFunctions", function () {
    checkSyntax("var foo = x => x;", "es6.arrowFunctions");
    checkSyntax("var foo = x => { return x * x };", "es6.arrowFunctions");
    checkSyntax("var foo = (x) => x;", "es6.arrowFunctions");
    checkSyntax("var foo = (a, b) => { return a * b };", "es6.arrowFunctions");
  });

  test("es6.classes", function () {
    checkSyntax("class Foo {}", "es6.classes");
    checkSyntax("var Foo = class {};", "es6.classes");
  });

  test("es6.forOf", function () {
    checkSyntax("for (var val of foo);", "es6.forOf");
    checkSyntax("for (val of foo);", "es6.forOf");
  });

  test("es6.modules", function () {
    checkSyntax("import 'foo';", "es6.modules");
    checkSyntax("import foo from 'foo';", "es6.modules");
    checkSyntax("import * as foo from 'foo';", "es6.modules");
    checkSyntax("import { foo } from 'foo';", "es6.modules");
    checkSyntax("export { foo } from 'foo';", "es6.modules");
    checkSyntax("export var foo = 5;", "es6.modules");
    checkSyntax("export class Foo {}", "es6.modules");
    checkSyntax("export function foo() {}", "es6.modules");
    checkSyntax("export default class Foo {}", "es6.modules");
    checkSyntax("export default function foo() {}", "es6.modules");
  });

  test("es6.destructuring", function () {
    checkSyntax("[a, b] = [];", "es6.destructuring");
    checkSyntax("var [a, b] = [];", "es6.destructuring");
    checkSyntax("({ a, b }) = {};", "es6.destructuring");
    checkSyntax("var { a, b } = {};", "es6.destructuring");
    checkSyntax("function foo(foo = bar) {}", "es6.destructuring");
  });

  test("es6.parameters.rest", function () {
    checkSyntax("function foo(...items) {}", "es6.parameters.rest");
    checkSyntax("var foo = (...items) => {}", "es6.parameters.rest");
  });

  test("es6.spread", function () {
    checkSyntax("new Foo(...items);", "es6.spread");
    checkSyntax("foo(...items);", "es6.spread");
    checkSyntax("[...items];", "es6.spread");
  });

  test("es6.templateLiterals", function () {
    checkSyntax("`foobar`;", "es6.templateLiterals");
    checkSyntax("foobar`foobar`;", "es6.templateLiterals");
  });

  test("es6.generators", function () {
    checkSyntax("function* foo() {}", "es6.generators");
    checkSyntax("var foo = function* () {};", "es6.generators");
  });

  test("es7.asyncFunctions", function () {
    checkSyntax("async function foo() {}", "es7.asyncFunctions");
    checkSyntax("var foo = async function() {};", "es7.asyncFunctions");
    checkSyntax("var foo = async () => {};", "es7.asyncFunctions");
  });

  test("es7.comprehensions", function () {
    checkSyntax("[for (i of test) i]", "es7.comprehensions");
    checkSyntax("(for (i of test) i)", "es7.comprehensions");
  });

  test("es7.objectSpread", function () {
    checkSyntax("var foo = { ...bar };", "es7.objectSpread");
  });

  test("es7.abstractReferences", function () {
    checkSyntax("class Foo { private A; }", "es7.abstractReferences");
    checkSyntax("foo::bar();", "es7.abstractReferences");
    checkSyntax("delete foo::bar;", "es7.abstractReferences");
    checkSyntax("foo::bar;", "es7.abstractReferences");
    checkSyntax("foo::bar = baz;", "es7.abstractReferences");
  });

  test("flow", function () {

  });

  test("jsx", function () {
    checkSyntax("<div />", "jsx");
    checkSyntax("<Element />", "jsx");
  });
});
