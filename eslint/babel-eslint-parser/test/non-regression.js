/*eslint-env mocha*/
"use strict";
var eslint = require("eslint");
var unpad = require("../utils/unpad");

function verifyAndAssertMessages(code, rules, expectedMessages, sourceType, overrideConfig) {
  var config = {
    parser: require.resolve(".."),
    rules: rules,
    env: {
      node: true,
      es6: true
    },
    parserOptions: {
      ecmaVersion: 8,
      ecmaFeatures: {
        jsx: true,
        experimentalObjectRestSpread: true,
        globalReturn: true
      },
      sourceType: sourceType
    }
  };

  if (overrideConfig) {
    for (var key in overrideConfig) {
      config[key] = overrideConfig[key];
    }
  }

  var messages = eslint.linter.verify(code, config);

  if (messages.length !== expectedMessages.length) {
    throw new Error(`Expected ${expectedMessages.length} message(s), got ${messages.length} ${JSON.stringify(messages)}`);
  }

  messages.forEach(function (message, i) {
    var formatedMessage = `${message.line}:${message.column} ${message.message}${(message.ruleId ? ` ${message.ruleId}` : "")}`;
    if (formatedMessage !== expectedMessages[i]) {
      throw new Error(
        unpad(`
          Message ${i} does not match:
          Expected: ${expectedMessages[i]}
          Actual:   ${formatedMessage}
        `)
      );
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
      [ "1:30 Newline required at end of file but not found. eol-last" ]
    );
  });

  xit("Readable error messages (issue #3)", function () {
    verifyAndAssertMessages(
      "{ , res }",
      {},
      [ "1:3 Parsing error: Unexpected token" ]
    );
  });

  it("Modules support (issue #5)", function () {
    verifyAndAssertMessages(
      unpad(`
        import Foo from 'foo';
        export default Foo;
        export const c = 'c';
        export class Store {}
      `),
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

  it("Arrow function with non-block bodies (issue #20)", function () {
    verifyAndAssertMessages(
      "\"use strict\"; () => 1",
      { "strict": [1, "global"] },
      [],
      "script"
    );
  });

  it("#242", function () {
    verifyAndAssertMessages(
      "\"use strict\"; asdf;",
      { "no-irregular-whitespace": 1 },
      [],
      {}
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
    verifyAndAssertMessages(
      unpad(`
        if (a) {
          // i'm a comment!
          let b = c
        }
      `),
      { "padded-blocks": [1, "never"] },
      []
    );
  });

  describe("flow", function () {
    it("check regular function", function () {
      verifyAndAssertMessages(
        "function a(b, c) { b += 1; c += 1; return b + c; } a;",
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
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          import type Foo3 from 'foo';
          function log(foo: ?Foo, foo2: ?Foo2): ?Foo3 {
            console.log(foo, foo2);
          }
          log(1, 2);
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("type parameters", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          function log<T1, T2>(a: T1, b: T2) { return a + b; }
          log<Foo, Foo2>(1, 2);
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("nested type annotations", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          function foo(callback: () => Foo) {
            return callback();
          }
          foo();
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("type in var declaration", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var x: Foo = 1;
          x;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("object type annotation", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a: {numVal: Foo};
          a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("object property types", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          var a = {
            circle: (null : ?{ setNativeProps(props: Foo): Foo2 })
          };
          a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("namespaced types", function () {
      verifyAndAssertMessages(
        unpad(`
          var React = require('react-native');
          var b = {
            openExternalExample: (null: ?React.Component)
          };
          var c = {
            render(): React.Component {}
          };
          b;
          c;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("ArrayTypeAnnotation", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var x: Foo[]; x;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("ClassImplements", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Bar from 'foo';
          export default class Foo implements Bar {}
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("type alias creates declaration + usage", function () {
      verifyAndAssertMessages(
        unpad(`
          type Foo = any;
          var x : Foo = 1; x;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("type alias with type parameters", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Bar from 'foo';
          import type Foo3 from 'foo';
          type Foo<T> = Bar<T, Foo3>
          var x : Foo = 1; x;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("export type alias", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo2 from 'foo';
          export type Foo = Foo2;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic types #109", function () {
      verifyAndAssertMessages(
        "export default function groupByEveryN<T>(array: Array<T>, n: number): Array<Array<?T>> { n; }",
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("types definition from import", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Promise from 'bluebird';
          type Operation = () => Promise;
          x: Operation;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic/generic types for class #123", function () {
      verifyAndAssertMessages(
        unpad(`
          class Box<T> {
            value: T;
          }
          var box = new Box();
          console.log(box.value);
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic/generic types for function #123", function () {
      verifyAndAssertMessages(
        unpad(`
          export function identity<T>(value) {
            var a: T = value; a;
          }
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic/generic types for type alias #123", function () {
      verifyAndAssertMessages(
        unpad(`
          import Bar from './Bar';
          type Foo<T> = Bar<T>; var x: Foo = 1; console.log(x);
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("polymorphpic/generic types - outside of fn scope #123", function () {
      verifyAndAssertMessages(
        unpad(`
          export function foo<T>(value) { value; };
          var b: T = 1; b;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        [ "1:21 'T' is defined but never used. no-unused-vars",
          "2:8 'T' is not defined. no-undef" ]
      );
    });

    it("polymorphpic/generic types - extending unknown #123", function () {
      verifyAndAssertMessages(
        unpad(`
          import Bar from 'bar';
          export class Foo extends Bar<T> {}
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        [ "2:30 'T' is not defined. no-undef" ]
      );
    });

    it("support declarations #132", function () {
      verifyAndAssertMessages(
        unpad(`
          declare class A { static () : number }
          declare module B { declare var x: number; }
          declare function foo<T>(): void;
          declare var bar
          A; B; foo(); bar;
        `),
        { "no-undef": 1, "no-unused-vars": 1 },
        []
      );
    });

    it("1", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          export default function(a: Foo, b: ?Foo2, c){ a; b; c; }
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("2", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          export default function(a: () => Foo){ a; }
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("3", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          export default function(a: (_:Foo) => Foo2){ a; }
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("4", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          import type Foo3 from 'foo';
          export default function(a: (_1:Foo, _2:Foo2) => Foo3){ a; }
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("5", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          export default function(a: (_1:Foo, ...foo:Array<Foo2>) => number){ a; }
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("6", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          export default function(): Foo {}
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("7", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          export default function():() => Foo {}
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("8", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          export default function():(_?:Foo) => Foo2{}
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("9", function () {
      verifyAndAssertMessages(
        "export default function <T1, T2>(a: T1, b: T2) { b; }",
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("10", function () {
      verifyAndAssertMessages(
        "var a=function<T1,T2>(a: T1, b: T2) {return a + b;}; a;",
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("11", function () {
      verifyAndAssertMessages(
        "var a={*id<T>(x: T): T { x; }}; a;",
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("12", function () {
      verifyAndAssertMessages(
        "var a={async id<T>(x: T): T { x; }}; a;",
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("13", function () {
      verifyAndAssertMessages(
        "var a={123<T>(x: T): T { x; }}; a;",
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("14", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          export default class Bar {set fooProp(value:Foo):Foo2{ value; }}
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("15", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo2 from 'foo';
          export default class Foo {get fooProp(): Foo2{}}
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("16", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var numVal:Foo; numVal;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("17", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a: {numVal: Foo;}; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("18", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          import type Foo3 from 'foo';
          var a: ?{numVal: Foo; [indexer: Foo2]: Foo3}; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("19", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          var a: {numVal: Foo; subObj?: ?{strVal: Foo2}}; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("20", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          import type Foo3 from 'foo';
          import type Foo4 from 'foo';
          var a: { [a: Foo]: Foo2; [b: Foo3]: Foo4; }; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("21", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          import type Foo3 from 'foo';
          var a: {add(x:Foo, ...y:Array<Foo2>): Foo3}; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("22", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          import type Foo3 from 'foo';
          var a: { id<Foo>(x: Foo2): Foo3; }; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("23", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a:Array<Foo> = [1, 2, 3]; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("24", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Baz from 'baz';
          export default class Bar<T> extends Baz<T> { };
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("25", function () {
      verifyAndAssertMessages(
        "export default class Bar<T> { bar(): T { return 42; }}",
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("26", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          export default class Bar { static prop1:Foo; prop2:Foo2; }
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("27", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          var x : Foo | Foo2 = 4; x;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("28", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          var x : () => Foo | () => Foo2; x;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("29", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          var x: typeof Foo | number = Foo2; x;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("30", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var {x}: {x: Foo; } = { x: 'hello' }; x;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("31", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var [x]: Array<Foo> = [ 'hello' ]; x;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("32", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          export default function({x}: { x: Foo; }) { x; }
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("33", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          function foo([x]: Array<Foo>) { x; } foo();
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("34", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          var a: Map<Foo, Array<Foo2> >; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("35", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a: ?Promise<Foo>[]; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("36", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          var a:(...rest:Array<Foo>) => Foo2; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("37", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          import type Foo3 from 'foo';
          import type Foo4 from 'foo';
          var a: <Foo>(x: Foo2, ...y:Foo3[]) => Foo4; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("38", function () {
      verifyAndAssertMessages(
        unpad(`
          import type {foo, bar} from 'baz';
          foo; bar;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("39", function () {
      verifyAndAssertMessages(
        unpad(`
          import type {foo as bar} from 'baz';
          bar;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("40", function () {
      verifyAndAssertMessages(
        unpad(`
          import type from 'foo';
          type;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("41", function () {
      verifyAndAssertMessages(
        unpad(`
          import type, {foo} from 'bar';
          type; foo;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("42", function () {
      verifyAndAssertMessages(
        unpad(`
          import type * as namespace from 'bar';
          namespace;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("43", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a: Foo[]; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("44", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a: ?Foo[]; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("45", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a: (?Foo)[]; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("46", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a: () => Foo[]; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("47", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a: (() => Foo)[]; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("48", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          var a: typeof Foo[]; a;
        `),
        { "no-unused-vars": 1, "no-undef": 1 },
        []
      );
    });

    it("49", function () {
      verifyAndAssertMessages(
        unpad(`
          import type Foo from 'foo';
          import type Foo2 from 'foo';
          import type Foo3 from 'foo';
          var a : [Foo, Foo2<Foo3>,] = [123, 'duck',]; a;
        `),
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
    verifyAndAssertMessages(
      unpad(`
        export default function root(stores) {
        return DecoratedComponent => class ReduxRootDecorator {
        a() { DecoratedComponent; stores; }
        };
        }
      `),
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
    verifyAndAssertMessages(
      unpad(`
        module.exports = {
        render() {
        var {name} = this.props;
        return Math.max(null, \`Name: \${name}, Name: \${name}\`);
        }
        };
      `),
      { "comma-spacing": 1 },
      []
    );
  });

  describe("decorators #72", function () {
    it("class declaration", function () {
      verifyAndAssertMessages(
        unpad(`
          import classDeclaration from 'decorator';
          import decoratorParameter from 'decorator';
          @classDeclaration((parameter) => parameter)
          @classDeclaration(decoratorParameter)
          @classDeclaration
          export class TextareaAutosize {}
        `),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("method definition", function () {
      verifyAndAssertMessages(
        unpad(`
          import classMethodDeclarationA from 'decorator';
          import decoratorParameter from 'decorator';
          export class TextareaAutosize {
          @classMethodDeclarationA((parameter) => parameter)
          @classMethodDeclarationA(decoratorParameter)
          @classMethodDeclarationA
          methodDeclaration(e) {
          e();
          }
          }
        `),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("method definition get/set", function () {
      verifyAndAssertMessages(
        unpad(`
          import classMethodDeclarationA from 'decorator';
          import decoratorParameter from 'decorator';
          export class TextareaAutosize {
          @classMethodDeclarationA((parameter) => parameter)
          @classMethodDeclarationA(decoratorParameter)
          @classMethodDeclarationA
          get bar() { }
          @classMethodDeclarationA((parameter) => parameter)
          @classMethodDeclarationA(decoratorParameter)
          @classMethodDeclarationA
          set bar(val) { val; }
          }
        `),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("object property", function () {
      verifyAndAssertMessages(
        unpad(`
          import classMethodDeclarationA from 'decorator';
          import decoratorParameter from 'decorator';
          var obj = {
          @classMethodDeclarationA((parameter) => parameter)
          @classMethodDeclarationA(decoratorParameter)
          @classMethodDeclarationA
          methodDeclaration(e) {
          e();
          }
          };
          obj;
        `),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("object property get/set", function () {
      verifyAndAssertMessages(
        unpad(`
          import classMethodDeclarationA from 'decorator';
          import decoratorParameter from 'decorator';
          var obj = {
          @classMethodDeclarationA((parameter) => parameter)
          @classMethodDeclarationA(decoratorParameter)
          @classMethodDeclarationA
          get bar() { },
          @classMethodDeclarationA((parameter) => parameter)
          @classMethodDeclarationA(decoratorParameter)
          @classMethodDeclarationA
          set bar(val) { val; }
          };
          obj;
        `),
        { "no-unused-vars": 1 },
        []
      );
    });
  });

  it("detects minimal no-unused-vars case #120", function () {
    verifyAndAssertMessages(
      "var unused;",
      { "no-unused-vars": 1 },
      [ "1:5 'unused' is defined but never used. no-unused-vars" ]
    );
  });

  // This two tests are disabled, as the feature to visit properties when
  // there is a spread/rest operator has been removed as it caused problems
  // with other rules #249
  it.skip("visits excluded properties left of spread #95", function () {
    verifyAndAssertMessages(
      "var originalObject = {}; var {field1, field2, ...clone} = originalObject;",
      { "no-unused-vars": 1 },
      []
    );
  });

  it.skip("visits excluded properties left of spread #210", function () {
    verifyAndAssertMessages(
      "const props = { yo: 'yo' }; const { ...otherProps } = props;",
      { "no-unused-vars": 1 },
      []
    );
  });

  it("does not mark spread variables false-positive", function () {
    verifyAndAssertMessages(
      "var originalObject = {}; var {field1, field2, ...clone} = originalObject;",
      { "no-undef": 1, "no-redeclare": 1 },
      []
    );
  });

  it("does not mark spread variables false-positive", function () {
    verifyAndAssertMessages(
      "const props = { yo: 'yo' }; const { ...otherProps } = props;",
      { "no-undef": 1, "no-redeclare": 1 },
      []
    );
  });

  it("does not mark spread variables as use-before-define #249", function () {
    verifyAndAssertMessages(
      "var originalObject = {}; var {field1, field2, ...clone} = originalObject;",
      { "no-use-before-define": 1 },
      []
    );
  });

  it("detects no-unused-vars with object destructuring #142", function () {
    verifyAndAssertMessages(
      "const {Bacona} = require('baconjs')",
      { "no-undef": 1, "no-unused-vars": 1 },
      [ "1:8 'Bacona' is assigned a value but never used. no-unused-vars" ]
    );
  });

  it("don't warn no-unused-vars with spread #142", function () {
    verifyAndAssertMessages(
      unpad(`
        export default function test(data) {
        return {
        foo: 'bar',
        ...data
        };
        }
      `),
      { "no-undef": 1, "no-unused-vars": 1 },
      []
    );
  });

  it("excludes comment tokens #153", function () {
    verifyAndAssertMessages(
      unpad(`
        var a = [
        1,
        2, // a trailing comment makes this line fail comma-dangle (always-multiline)
        ];
      `),
      { "comma-dangle": [2, "always-multiline"] },
      []
    );

    verifyAndAssertMessages(
      unpad(`
        switch (a) {
        // A comment here makes the above line fail brace-style
        case 1:
        console.log(a);
        }
      `),
      { "brace-style": 2 },
      []
    );
  });

  it("ternary and parens #149", function () {
    verifyAndAssertMessages(
    "true ? (true) : false;",
      { "space-infix-ops": 1 },
      []
    );
  });

  it("line comment space-in-parens #124", function () {
    verifyAndAssertMessages(
      unpad(`
        React.createClass({
        render() {
        // return (
        //   <div />
        // ); // <-- this is the line that is reported
        }
        });
      `),
      { "space-in-parens": 1 },
      [ ]
    );
  });

  it("block comment space-in-parens #124", function () {
    verifyAndAssertMessages(
      unpad(`
        React.createClass({
        render() {
        /*
        return (
          <div />
        ); // <-- this is the line that is reported
        */
        }
        });
      `),
      { "space-in-parens": 1 },
      [ ]
    );
  });

  it("no no-undef error with rest #11", function () {
    verifyAndAssertMessages("const [a, ...rest] = ['1', '2', '3']; a; rest;",
      { "no-undef": 1, "no-unused-vars": 1 },
      [ ]
    );
  });

  it("async function with space-before-function-paren #168", function () {
    verifyAndAssertMessages("it('handles updates', async function() {});",
      { "space-before-function-paren": [1, "never"] },
      [ ]
    );
  });

  it("default param flow type no-unused-vars #184", function () {
    verifyAndAssertMessages(
      unpad(`
        type ResolveOptionType = {
        depth?: number,
        identifier?: string
        };

        export default function resolve(
        options: ResolveOptionType = {}
        ): Object {
        options;
        }
      `),
      { "no-unused-vars": 1, "no-undef": 1 },
      [ ]
    );
  });

  it("no-use-before-define #192", function () {
    verifyAndAssertMessages(
      unpad(`
        console.log(x);
        var x = 1;
      `),
      { "no-use-before-define": 1 },
      [ "1:13 'x' was used before it was defined. no-use-before-define" ]
    );
  });

  it("jsx and stringliteral #216", function () {
    verifyAndAssertMessages(
      "<div className=''></div>",
      {},
      []
    );
  });

  it("getter/setter #218", function () {
    verifyAndAssertMessages(
      unpad(`
        class Person {
            set a (v) { }
        }
      `),
      { "space-before-function-paren": 1, "keyword-spacing": [1, {"before": true}], "indent": 1 },
      []
    );
  });

  it("getter/setter #220", function () {
    verifyAndAssertMessages(
      unpad(`
        var B = {
        get x () {
        return this.ecks;
        },
        set x (ecks) {
        this.ecks = ecks;
        }
        };
      `),
      { "no-dupe-keys": 1 },
      []
    );
  });

  it("fixes issues with flow types and ObjectPattern", function () {
    verifyAndAssertMessages(
      unpad(`
        import type Foo from 'bar';
        export default class Foobar {
          foo({ bar }: Foo) { bar; }
          bar({ foo }: Foo) { foo; }
        }
      `),
      { "no-unused-vars": 1, "no-shadow": 1 },
      []
    );
  });

  it("correctly detects redeclares if in script mode #217", function () {
    verifyAndAssertMessages(
      unpad(`
        var a = 321;
        var a = 123;
      `),
      { "no-redeclare": 1 },
      [ "2:5 'a' is already defined. no-redeclare" ],
      "script"
    );
  });

  it("correctly detects redeclares if in module mode #217", function () {
    verifyAndAssertMessages(
      unpad(`
        var a = 321;
        var a = 123;
      `),
      { "no-redeclare": 1 },
      [ "2:5 'a' is already defined. no-redeclare" ],
      "module"
    );
  });

  it("no-implicit-globals in script", function () {
    verifyAndAssertMessages(
      "var leakedGlobal = 1;",
      { "no-implicit-globals": 1 },
      [ "1:5 Implicit global variable, assign as global property instead. no-implicit-globals" ],
      "script",
      {
        env: {},
        parserOptions: { ecmaVersion: 6, sourceType: "script" }
      }
    );
  });

  it("no-implicit-globals in module", function () {
    verifyAndAssertMessages(
      "var leakedGlobal = 1;",
      { "no-implicit-globals": 1 },
      [],
      "module",
      {
        env: {},
        parserOptions: { ecmaVersion: 6, sourceType: "module" }
      }
    );
  });

  it("no-implicit-globals in default", function () {
    verifyAndAssertMessages(
      "var leakedGlobal = 1;",
      { "no-implicit-globals": 1 },
      [],
      null,
      {
        env: {},
        parserOptions: { ecmaVersion: 6 }
      }
    );
  });

  it("allowImportExportEverywhere option (#327)", function () {
    verifyAndAssertMessages(
      unpad(`
        if (true) { import Foo from 'foo'; }
        function foo() { import Bar from 'bar'; }
        switch (a) { case 1: import FooBar from 'foobar'; }
      `),
      {},
      [],
      "module",
      {
        env: {},
        parserOptions: { ecmaVersion: 6, sourceType: "module", allowImportExportEverywhere: true }
      }
    );
  });

  it("with does not crash parsing in script mode (strict off) #171", function () {
    verifyAndAssertMessages(
      "with (arguments) { length; }",
      {},
      [],
      "script"
    );
  });

  xit("with does crash parsing in module mode (strict on) #171", function () {
    verifyAndAssertMessages(
      "with (arguments) { length; }",
      {},
      [ "1:1 Parsing error: 'with' in strict mode" ]
    );
  });

  it("new.target is not reported as undef #235", function () {
    verifyAndAssertMessages(
      "function foo () { return new.target }",
      { "no-undef": 1 },
      []
    );
  });

  it("decorator does not create TypeError #229", function () {
    verifyAndAssertMessages(
      unpad(`
        class A {
          @test
          f() {}
        }
      `),
      { "no-undef": 1 },
      [ "2:4 'test' is not defined. no-undef" ]
    );
  });

  it("Flow definition does not trigger warnings #223", function () {
    verifyAndAssertMessages(
      unpad(`
        import { Map as $Map } from 'immutable';
        function myFunction($state: $Map, { a, b, c } : { a: ?Object, b: ?Object, c: $Map }) {}
      `),
      { "no-dupe-args": 1, "no-redeclare": 1, "no-shadow": 1 },
      []
    );
  });

  it("newline-before-return with comments #289", function () {
    verifyAndAssertMessages(
      unpad(`
        function a() {
        if (b) {
        /* eslint-disable no-console */
        console.log('test');
        /* eslint-enable no-console */
        }

        return hasGlobal;
        }
      `),
      { "newline-before-return": 1 },
      []
    );
  });

  it("spaced-comment with shebang #163", function () {
    verifyAndAssertMessages(
      unpad(`
        #!/usr/bin/env babel-node
        import {spawn} from 'foobar';
      `),
      { "spaced-comment": 1 },
      []
    );
  });

  describe("Class Property Declarations", function() {
    it("no-redeclare false positive 1", function() {
      verifyAndAssertMessages(
        unpad(`
          class Group {
            static propTypes = {};
          }
          class TypicalForm {
            static propTypes = {};
          }
        `),
        { "no-redeclare": 1 },
        []
      );
    });

    it("no-redeclare false positive 2", function() {
      verifyAndAssertMessages(
        unpad(`
          function validate() {}
          class MyComponent {
            static validate = validate;
          }
        `),
        { "no-redeclare": 1 },
        []
      );
    });

    it("check references", function() {
      verifyAndAssertMessages(
        unpad(`
          var a;
          class A {
            prop1;
            prop2 = a;
            prop3 = b;
          }
          new A
        `),
        { "no-undef": 1, "no-unused-vars": 1, "no-redeclare": 1 },
        [
          "5:11 'b' is not defined. no-undef"
        ]
      );
    });
  });

  it("dynamic import support", function () {
    verifyAndAssertMessages(
      "import('test-module').then(() => {})",
      {},
      []
    );
  });

  // it("regex with es6 unicodeCodePointEscapes", function () {
  //   verifyAndAssertMessages(
  //     "string.replace(/[\u{0000A0}-\u{10FFFF}<>\&]/gmiu, (char) => `&#x${char.codePointAt(0).toString(16)};`);",
  //     {},
  //     []
  //   );
  // });
});
