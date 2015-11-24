/*eslint-env mocha*/
"use strict";
var eslint = require("eslint");

function verifyAndAssertMessages(code, rules, expectedMessages, features) {
  var defaultEcmaFeatures = {
    arrowFunctions: true,
    binaryLiterals: true,
    blockBindings: true,
    classes: true,
    defaultParams: true,
    destructuring: true,
    forOf: true,
    generators: true,
    modules: true,
    objectLiteralComputedProperties: true,
    objectLiteralDuplicateProperties: true,
    objectLiteralShorthandMethods: true,
    objectLiteralShorthandProperties: true,
    octalLiterals: true,
    regexUFlag: true,
    regexYFlag: true,
    restParams: true,
    spread: true,
    superInFunctions: true,
    templateStrings: true,
    unicodeCodePointEscapes: true,
    globalReturn: true,
    jsx: true,
    experimentalObjectRestSpread: true
  };

  var messages = eslint.linter.verify(
    code,
    {
      parser: require.resolve(".."),
      rules: rules,
      env: {
        node: true
      },
      ecmaFeatures: features || defaultEcmaFeatures
    }
  );

  if (messages.length !== expectedMessages.length) {
    throw new Error("Expected " + expectedMessages.length + " message(s), got " + messages.length + " " + JSON.stringify(messages));
  }

  messages.forEach(function (message, i) {
    var formatedMessage = message.line + ":" + message.column + " " + message.message + (message.ruleId ? " " + message.ruleId : "");
    if (formatedMessage !== expectedMessages[i]) {
      throw new Error("Message " + i + " does not match:\nExpected: " + expectedMessages[i] + "\nActual:   " + formatedMessage);
    }
  });
}

describe("verify", function () {
  it("arrow function support (issue #1)", function () {
    verifyAndAssertMessages(
      "describe('stuff', () => {});",
      {},
      []
    );
  });

  it("EOL validation (issue #2)", function () {
    verifyAndAssertMessages(
      "module.exports = \"something\";",
      { "eol-last": 1, "semi": 1 },
      [ "1:2 Newline required at end of file but not found. eol-last" ]
    );
  });

  it("Readable error messages (issue #3)", function () {
    verifyAndAssertMessages(
      "{ , res }",
      {},
      [ "1:3 Parsing error: Unexpected token" ]
    );
  });

  it("Modules support (issue #5)", function () {
    verifyAndAssertMessages(
      "import Foo from 'foo';\n" +
      "export default Foo;\n" +
      "export const c = 'c';\n" +
      "export class Store {}",
      {},
      []
    );
  });

  it("Rest parameters (issue #7)", function () {
    verifyAndAssertMessages(
      "function foo(...args) { return args; }",
      { "no-undef": 1 },
      []
    );
  });

  it("Exported classes should be used (issue #8)", function () {
    verifyAndAssertMessages(
      "class Foo {} module.exports = Foo;",
      { "no-unused-vars": 1 },
      []
    );
  });

  it("super keyword in class (issue #10)", function () {
    verifyAndAssertMessages(
      "class Foo { constructor() { super() } }",
      { "no-undef": 1 },
      []
    );
  });

  it("Rest parameter in destructuring assignment (issue #11)", function () {
    verifyAndAssertMessages(
      "const [a, ...rest] = ['1', '2', '3']; module.exports = rest;",
      { "no-undef": 1 },
      []
    );
  });

  it("JSX attribute names marked as variables (issue #12)", function () {
    verifyAndAssertMessages(
      "module.exports = <div className=\"foo\" />",
      { "no-undef": 1 },
      []
    );
  });

  it("Multiple destructured assignment with compound properties (issue #16)", function () {
    verifyAndAssertMessages(
      "module.exports = { ...a.a, ...a.b };",
      { "no-dupe-keys": 1 },
      []
    );
  });

  // fix after updating to ESLint 1.0.0
  it.skip("Arrow function with non-block bodies (issue #20)", function () {
    verifyAndAssertMessages(
      "\"use strict\"; () => 1",
      { "strict": [1, "global"] },
      [],
      { modules: false }
    );
  });

  it("await keyword (issue #22)", function () {
    verifyAndAssertMessages(
      "async function foo() { await bar(); }",
      { "no-unused-expressions": 1 },
      []
    );
  });

  it("arrow functions (issue #27)", function () {
    verifyAndAssertMessages(
      "[1, 2, 3].map(i => i * 2);",
      { "func-names": 1, "space-before-blocks": 1 },
      []
    );
  });

  it("comment with padded-blocks (issue #33)", function () {
    verifyAndAssertMessages([
        "if (a){",
          "// i'm a comment!",
         "let b = c",
        "}"
      ].join("\n"),
      { "padded-blocks": [1, "never"] },
      []
    );
  });

  describe("flow", function () {
    it("check regular function", function () {
      verifyAndAssertMessages([
          "function a(b, c) { b += 1; c += 1; } a;",
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("type alias", function () {
      verifyAndAssertMessages(
        "type SomeNewType = any;",
        { "no-undef": 1 },
        []
      );
    });

    it("type cast expression #102", function () {
      verifyAndAssertMessages(
        "for (let a of (a: Array)) {}",
        {},
        []
      );
    });

    it("multiple nullable type annotations and return #108", function () {
      verifyAndAssertMessages([
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "import type Foo3 from 'foo';",
          "function log(foo: ?Foo, foo2: ?Foo2): ?Foo3 {",
            "console.log(foo, foo2);",
          "}",
          "log(1, 2);"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("type parameters", function () {
      verifyAndAssertMessages([
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "function log<T1, T2>(a: T1, b: T2) { return a + b; }",
          "log<Foo, Foo2>(1, 2);"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("nested type annotations", function () {
      verifyAndAssertMessages([
          "import type Foo from 'foo';",
          "function foo(callback: () => Foo) {",
            "return callback();",
          "}",
          "foo();"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("type in var declaration", function () {
      verifyAndAssertMessages([
          "import type Foo from 'foo';",
          "var x: Foo = 1;",
          "x;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("object type annotation", function () {
      verifyAndAssertMessages([
          "import type Foo from 'foo';",
          "var a: {numVal: Foo};",
          "a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("object property types", function () {
      verifyAndAssertMessages([
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "var a = {",
            "circle: (null : ?{ setNativeProps(props: Foo): Foo2 })",
          "};",
          "a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("namespaced types", function () {
      verifyAndAssertMessages([
          "var React = require('react-native');",
          "var b = {",
            "openExternalExample: (null: ?React.Component)",
          "};",
          "var c = {",
            "render(): React.Component {}",
          "};",
          "b;",
          "c;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("ArrayTypeAnnotation", function () {
      verifyAndAssertMessages([
          "import type Foo from 'foo';",
          "var x: Foo[]; x;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("ClassImplements", function () {
      verifyAndAssertMessages([
          "import type Bar from 'foo';",
          "export default class Foo implements Bar {}"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("type alias creates declaration + usage", function () {
      verifyAndAssertMessages([
          "type Foo = any;",
          "var x : Foo = 1; x;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("type alias with type parameters", function () {
      verifyAndAssertMessages([
          "import type Bar from 'foo';",
          "import type Foo3 from 'foo';",
          "type Foo<T> = Bar<T, Foo3>",
          "var x : Foo = 1; x;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("export type alias", function () {
      verifyAndAssertMessages([
          "import type Foo2 from 'foo';",
          "export type Foo = Foo2;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic types #109", function () {
      verifyAndAssertMessages([
          "export default function groupByEveryN<T>(array: Array<T>, n: number): Array<Array<?T>> { n; }"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("types definition from import", function () {
      verifyAndAssertMessages([
          "import type Promise from 'bluebird';",
          "type Operation = () => Promise;",
          "x: Operation;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic/generic types for class #123", function () {
      verifyAndAssertMessages([
          "class Box<T> {",
            "value: T;",
          "}",
          "var box = new Box();",
          "console.log(box.value);"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic/generic types for function #123", function () {
      verifyAndAssertMessages([
          "export function identity<T>(value) {",
            "var a: T = value; a;",
          "}"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic/generic types for type alias #123", function () {
      verifyAndAssertMessages([
          "import Bar from './Bar';",
          "type Foo<T> = Bar<T>; var x: Foo = 1; x++"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic/generic types - outside of fn scope #123", function () {
      verifyAndAssertMessages([
          "export function foo<T>(value) { value; };",
          "var b: T = 1; b;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        [ "1:21 \"T\" is defined but never used no-unused-vars",
          '2:8 "T" is not defined. no-undef' ]
      );
    });

    it("polymorphpic/generic types - extending unknown #123", function () {
      verifyAndAssertMessages([
          "import Bar from 'bar';",
          "export class Foo extends Bar<T> {}",
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        [ '2:30 "T" is not defined. no-undef' ]
      );
    });

    it("support declarations #132", function () {
      verifyAndAssertMessages([
          "declare class A { static () : number }",
          "declare module B { declare var x: number; }",
          "declare function foo<T>(): void;",
          "declare var bar",
          "A; B; foo(); bar;"
        ].join("\n"),
        { "no-undef": 1, "no-unused-vars": 1 },
        []
      );
    });

    it("1", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "export default function(a: Foo, b: ?Foo2, c){ a; b; c; }"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("2", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "export default function(a: () => Foo){ a; }"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("3", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "export default function(a: (_:Foo) => Foo2){ a; }"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("4", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "import type Foo3 from 'foo';",
          "export default function(a: (_1:Foo, _2:Foo2) => Foo3){ a; }"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("5", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "export default function(a: (_1:Foo, ...foo:Array<Foo2>) => number){ a; }"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("6", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "export default function(): Foo {}"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("7", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "export default function():() => Foo {}"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("8", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "export default function():(_?:Foo) => Foo2{}"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("9", function () {
      verifyAndAssertMessages(
        [
          "export default function <T1, T2>(a: T1, b: T2) { b; }"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("10", function () {
      verifyAndAssertMessages(
        [
          "var a=function<T1,T2>(a: T1, b: T2) {return a + b;}; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("11", function () {
      verifyAndAssertMessages(
        [
          "var a={*id<T>(x: T): T { x; }}; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("12", function () {
      verifyAndAssertMessages(
        [
          "var a={async id<T>(x: T): T { x; }}; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("13", function () {
      verifyAndAssertMessages(
        [
          "var a={123<T>(x: T): T { x; }}; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("14", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "export default class Bar {set fooProp(value:Foo):Foo2{ value; }}"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("15", function () {
      verifyAndAssertMessages(
        [
          "import type Foo2 from 'foo';",
          "export default class Foo {get fooProp(): Foo2{}}"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("16", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var numVal:Foo; numVal;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("17", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var a: {numVal: Foo;}; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("18", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "import type Foo3 from 'foo';",
          "var a: ?{numVal: Foo; [indexer: Foo2]: Foo3}; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("19", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "var a: {numVal: Foo; subObj?: ?{strVal: Foo2}}; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("20", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "import type Foo3 from 'foo';",
          "import type Foo4 from 'foo';",
          "var a: { [a: Foo]: Foo2; [b: Foo3]: Foo4; }; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("21", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "import type Foo3 from 'foo';",
          "var a: {add(x:Foo, ...y:Array<Foo2>): Foo3}; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("22", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "import type Foo3 from 'foo';",
          "var a: { id<Foo>(x: Foo2): Foo3; }; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("23", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var a:Array<Foo> = [1, 2, 3]; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("24", function () {
      verifyAndAssertMessages(
        [
          "import type Baz from 'baz';",
          "export default class Bar<T> extends Baz<T> { };"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("25", function () {
      verifyAndAssertMessages(
        [
          "export default class Bar<T> { bar(): T { return 42; }}"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("26", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "export default class Bar { static prop1:Foo; prop2:Foo2; }"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("27", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "var x : Foo | Foo2 = 4; x;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("28", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "var x : () => Foo | () => Foo2; x;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("29", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "var x: typeof Foo | number = Foo2; x;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("30", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var {x}: {x: Foo; } = { x: 'hello' }; x;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("31", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var [x]: Array<Foo> = [ 'hello' ]; x;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it.skip("32", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "export default function({x}: { x: Foo; }) { x; }"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("33", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "function foo([x]: Array<Foo>) { x; } foo();"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("34", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "var a: Map<Foo, Array<Foo2> >; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("35", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var a: ?Promise<Foo>[]; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("36", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "var a:(...rest:Array<Foo>) => Foo2; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("37", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "import type Foo3 from 'foo';",
          "import type Foo4 from 'foo';",
          "var a: <Foo>(x: Foo2, ...y:Foo3[]) => Foo4; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("38", function () {
      verifyAndAssertMessages(
        [
          "import type {foo, bar} from 'baz';",
          "foo; bar;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("39", function () {
      verifyAndAssertMessages(
        [
          "import type {foo as bar} from 'baz';",
          "bar;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("40", function () {
      verifyAndAssertMessages(
        [
          "import type from 'foo';",
          "type;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("41", function () {
      verifyAndAssertMessages(
        [
          "import type, {foo} from 'bar';",
          "type; foo;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("42", function () {
      verifyAndAssertMessages(
        [
          "import type * as namespace from 'bar';",
          "namespace;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("43", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var a: Foo[]; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("44", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var a: ?Foo[]; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("45", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var a: (?Foo)[]; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("46", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var a: () => Foo[]; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("47", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var a: (() => Foo)[]; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("48", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "var a: typeof Foo[]; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("49", function () {
      verifyAndAssertMessages(
        [
          "import type Foo from 'foo';",
          "import type Foo2 from 'foo';",
          "import type Foo3 from 'foo';",
          "var a : [Foo, Foo2<Foo3>,] = [123, 'duck',]; a;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });
  });

  it("class usage", function () {
    verifyAndAssertMessages(
      "class Lol {} module.exports = Lol;",
      { "no-unused-vars": 1 },
      []
    );
  });

  it("class definition: gaearon/redux#24", function () {
    verifyAndAssertMessages([
        "export default function root(stores) {",
          "return DecoratedComponent => class ReduxRootDecorator {",
            "a() { DecoratedComponent; stores; }",
          "};",
        "}",
      ].join("\n"),
      { "no-undef": 1, "no-unused-vars": 1 },
      []
    );
  });

  it("class properties #71", function () {
    verifyAndAssertMessages(
      "class Lol { foo = 'bar'; }",
      { "no-undef": 1 },
      []
    );
  });

  it("template strings #31", function () {
    verifyAndAssertMessages(
      "console.log(`${a}, b`);",
      { "comma-spacing": 1 },
      []
    );
  });

  it("template with destructuring #31", function () {
    verifyAndAssertMessages([
      "module.exports = {",
        "render() {",
          "var {name} = this.props;",
          "return Math.max(null, `Name: ${name}, Name: ${name}`);",
        "}",
      "};"].join("\n"),
      { "comma-spacing": 1 },
      []
    );
  });

  describe("comprehensions", function () {
    it("array #9", function () {
      verifyAndAssertMessages([
          "let arr = [1, 2, 3];",
          "let b = [for (e of arr) String(e)]; b;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("array, if statement, multiple blocks", function () {
      verifyAndAssertMessages([
          "let arr = [1, 2, 3];",
          "let arr2 = [1, 2, 3];",
          "[for (x of arr) for (y of arr2) if (x === true && y === true) x + y];"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("generator, if statement, multiple blocks", function () {
      verifyAndAssertMessages([
          "let arr = [1, 2, 3];",
          "let arr2 = [1, 2, 3];",
          "(for (x of arr) for (y of arr2) if (x === true && y === true) x + y)"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("ArrayPattern", function () {
      verifyAndAssertMessages([
          "let arr = [1, 2, 3];",
          "[for ([,x] of arr) x]"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("ObjectPattern", function () {
      verifyAndAssertMessages([
          "let arr = [{x: 1, y: 2}, {x: 2, y: 3}];",
          "[for ({x, y} of arr) x + y]"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("multiple comprehensions #138", function () {
      verifyAndAssertMessages([
          "function test() {",
            "let items;",
            "return {",
              "a: [for (i of items) i],",
              "b: [for (i of items) i]",
            "};",
          "} test;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1, "no-redeclare": 1 },
        []
      );
    });

    it("visiting filter in comprehension", function () {
      verifyAndAssertMessages([
          "function test(items, val) {",
            "return [ for (i of items) if (i === val) i ];",
          "} test;"
        ].join("\n"),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });
  });

  describe("decorators #72", function () {
    it("class declaration", function () {
      verifyAndAssertMessages(
        [
          "import classDeclaration from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "@classDeclaration(decoratorParameter)",
          "@classDeclaration",
          "export class TextareaAutosize {}"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("method definition", function () {
      verifyAndAssertMessages(
        [
          "import classMethodDeclarationA from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "export class TextareaAutosize {",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "methodDeclaration(e) {",
              "e();",
            "}",
          "}"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("method definition get/set", function () {
      verifyAndAssertMessages(
        [
          "import classMethodDeclarationA from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "export class TextareaAutosize {",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "get bar() { }",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "set bar(val) { val; }",
          "}"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("object property", function () {
      verifyAndAssertMessages(
        [
          "import classMethodDeclarationA from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "var obj = {",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "methodDeclaration(e) {",
              "e();",
            "}",
          "};",
          "obj;"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("object property get/set", function () {
      verifyAndAssertMessages(
        [
          "import classMethodDeclarationA from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "var obj = {",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "get bar() { },",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "set bar(val) { val; }",
          "};",
          "obj;"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });
  });

  it("detects minimal no-unused-vars case #120", function () {
    verifyAndAssertMessages(
      "var unused;",
      { "no-unused-vars": 1 },
      [ "1:5 \"unused\" is defined but never used no-unused-vars" ]
    );
  });

  it("visits excluded properties left of spread #95", function () {
    verifyAndAssertMessages(
      "var originalObject = {}; var {field1, field2, ...clone} = originalObject;",
      { "no-undef": 1, "no-unused-vars": 1, "no-redeclare": 1 },
      []
    );
  });

  it("visits excluded properties left of spread #210", function () {
    verifyAndAssertMessages(
      "const props = { yo: 'yo' }; const { ...otherProps } = props;",
      { "no-undef": 1, "no-unused-vars": 1, "no-redeclare": 1 },
      []
    );
  });

  it("detects no-unused-vars with object destructuring #142", function () {
    verifyAndAssertMessages(
      "const {Bacona} = require('baconjs')",
      { "no-undef": 1, "no-unused-vars": 1 },
      [ "1:8 \"Bacona\" is defined but never used no-unused-vars" ]
    );
  });

  it("don't warn no-unused-vars with spread #142", function () {
    verifyAndAssertMessages([
        "export default function test(data) {",
          "return {",
            "foo: 'bar',",
            "...data",
          "};",
        "}",
      ].join("\n"),
      { "no-undef": 1, "no-unused-vars": 1 },
      []
    );
  });

  it("excludes comment tokens #153", function () {
    verifyAndAssertMessages(
      [
        "var a = [",
          "1,",
          "2, // a trailing comment makes this line fail comma-dangle (always-multiline)",
        "];",
      ].join("\n"),
      { "comma-dangle": [2, "always-multiline"] },
      []
    );

    verifyAndAssertMessages(
      [
        "switch (a) {",
          "// A comment here makes the above line fail brace-style",
          "case 1:",
            "console.log(a);",
        "}"
      ].join("\n"),
      { "brace-style": 2 },
      []
    );
  });

  it("ternary and parens #149", function () {
    verifyAndAssertMessages([
        "true ? (true) : false;"
      ].join("\n"),
      { "space-infix-ops": 1 },
      []
    );
  });

  it("line comment space-in-parens #124", function () {
    verifyAndAssertMessages(
      [
        "React.createClass({",
          "render() {",
             "// return (",
             "//   <div />",
             "// ); // <-- this is the line that is reported",
          "}",
        "});"
      ].join("\n"),
      { "space-in-parens": 1 },
      [ ]
    )
  });

  it("block comment space-in-parens #124", function () {
    verifyAndAssertMessages(
      [
        "React.createClass({",
          "render() {",
            "/*",
            "return (",
            "  <div />",
            "); // <-- this is the line that is reported",
            "*/",
          "}",
        "});"
      ].join("\n"),
      { "space-in-parens": 1 },
      [ ]
    )
  });

  it("no no-undef error with rest #11", function () {
    verifyAndAssertMessages("const [a, ...rest] = ['1', '2', '3']; a; rest;",
      { "no-undef": 1, "no-unused-vars": 1 },
      [ ]
    )
  });

  it("async function with space-before-function-paren #168", function () {
    verifyAndAssertMessages("it('handles updates', async function() {});",
      { "space-before-function-paren": [1, "never"] },
      [ ]
    )
  });

  it("default param flow type no-unused-vars #184", function () {
    verifyAndAssertMessages(
      [
        "type ResolveOptionType = {",
          "depth?: number,",
          "identifier?: string",
        "};",
        "",
        "export default function resolve(",
          "options: ResolveOptionType = {}",
        "): Object {",
          "options;",
        "}",
      ].join("\n"),
      { "no-unused-vars": 1, "no-undef": 1 },
      [ ]
    )
  });

  it("no-use-before-define #192", function () {
    verifyAndAssertMessages(
      [
        "console.log(x);",
        "var x = 1;"
      ].join("\n"),
      { "no-use-before-define": 1 },
      [ "1:13 \"x\" was used before it was defined no-use-before-define" ]
    )
  });
});
