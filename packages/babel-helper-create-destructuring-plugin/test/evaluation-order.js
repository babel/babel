import { transformSync } from "@babel/core";
import { compileFunction, createContext } from "node:vm";
import { createDestructuringPlugin, FEATURES } from "../lib/index.js";
import checkScopeInfo from "./helpers/checkScopeInfo.js";

function expectSameEvaluation(
  input,
  feature,
  options = {},
  evaluate = code => new Function(code)(),
) {
  const source = `return (() => { ${input} })();`;
  const { code } = transformSync(source, {
    configFile: false,
    babelrc: false,
    sourceType: "script",
    parserOpts: { allowReturnOutsideFunction: true },
    plugins: [
      () =>
        createDestructuringPlugin({
          name: "test-destructuring",
          feature,
          options,
        }),
      checkScopeInfo,
    ],
  });
  const actual = evaluate(code);
  const expected = evaluate(source);
  if (actual instanceof Promise && expected instanceof Promise) {
    return Promise.all([actual, expected]).then(([actual, expected]) => {
      expect(actual).toEqual(expected);
    });
  }
  expect(actual).toEqual(expected);
}

const keyExpressions = ["key", "+key", "-key", "~key", "`${key}`", 'key + ""'];

it.each([
  "const [{ a: { ...rest }, b = log.push('default') }] = [source];",
  "let rest, b; ([{ a: { ...rest }, b = log.push('default') }] = [source]);",
  "function f([{ a: { ...rest }, b = log.push('default') }]) {} f([source]);",
  "const [{ a: { ...rest }, [log.push('key')]: b }] = [source];",
  "const [{ a: { ...rest }, c: { ...other } }] = [source];",
])("keeps nested rest before later properties: %s", statement => {
  for (const value of ["null", "{ get x() { log.push('rest'); return 1; } }"]) {
    expectSameEvaluation(
      `const log = [];
       const source = {
         a: ${value},
         get b() { log.push('b'); },
         get c() { log.push('c'); return {}; },
       };
       try { ${statement} } catch (error) { log.push(error.name); }
       return log;`,
      FEATURES.objectRest,
    );
  }
});

it.each([
  "while (i < 2 && objects.push(OBJECT)) { i++; }",
  "do { i++; } while (i <= 2 && objects.push(OBJECT));",
  "for (; i < 2 && objects.push(OBJECT); i++) {}",
  "for (; i < 2; objects.push(OBJECT), i++) {}",
  "for (let j = 0; i < 2 && objects.push(OBJECT); i++, j++) {}",
  "for (var j = 0; i < 2 && objects.push(OBJECT); i++, j++) {}",
  "for (const j = 0; i < 2 && objects.push(OBJECT); i++) {}",
  "for (i = 0; i < 2 && objects.push(OBJECT); i++) {}",
  "outer: inner: for (var j = 0; i < 2 && objects.push(OBJECT); i++) { continue outer; }",
  "outer: do { i++; continue outer; } while (i <= 2 && objects.push(OBJECT));",
])("captures each home object in %s", loop => {
  expectSameEvaluation(
    `const objects = [];
     let i = 0;
     ${loop.replace("OBJECT", "{ ...{}, __proto__: { x: i }, m() { return super.x; } }")}
     return objects.map(object => object.m());`,
    FEATURES.objectSpread,
  );
});

it.each(["field", "#field"])(
  "captures each home object in an instance %s",
  field => {
    expectSameEvaluation(
      `let i = 0;
       class C {
         ${field} = { ...{}, __proto__: { x: ++i }, m() { return super.x; } };
         get() { return this.${field}; }
       }
       const a = new C(), b = new C();
       Object.setPrototypeOf(a.get(), { x: 7 });
       return [a.get().m(), b.get().m()];`,
      FEATURES.objectSpread,
    );
  },
);

it("keeps header and body home objects independent", () => {
  expectSameEvaluation(
    `const objects = [];
     for (var i = 0; i < 2 && objects.push({
       ...{}, __proto__: { x: i }, m() { return super.x; }
     }); i++) {
       objects.push({ ...{}, __proto__: { x: i + 2 }, m() { return super.x; } });
     }
     return objects.map(object => object.m());`,
    FEATURES.objectSpread,
  );
});

it.each([
  "get x() { return super.x; }, set x(value) { this.value = value; }",
  "set x(value) { this.value = value; }, get x() { return super.x; }",
  "get x() { return super.x; }, set x(value) { super.value = value; }",
])("preserves paired accessors in a loop header: %s", methods => {
  expectSameEvaluation(
    `const objects = [];
     let i = 0;
     while (i < 2 && objects.push({ ...{}, __proto__: { x: i }, ${methods} })) i++;
     return objects.map(object => { object.x = 7; return [object.x, object.value]; });`,
    FEATURES.objectSpread,
  );
});

it("preserves computed method key suspensions in a loop header", () => {
  expectSameEvaluation(
    `function* make() {
       const objects = [];
       let i = 0;
       while (i++ < 2 && objects.push({
         ...{}, __proto__: { x: i }, [(yield i)]() { return super.x; }
       })) {}
       return objects.map(object => object.m());
     }
     const iterator = make();
     return [iterator.next(), iterator.next("m"), iterator.next("m")];`,
    FEATURES.objectSpread,
  );
});

it("keeps user Object bindings out of accessor factories", () => {
  expectSameEvaluation(
    `function make(Object) {
       const objects = [];
       let i = 0;
       while (i < 2 && objects.push({
         ...{}, __proto__: { x: i }, get [Object.key]() { return super.x; }
       })) i++;
       return objects.map(object => object.x);
     }
     return make({ key: "x" });`,
    FEATURES.objectSpread,
  );
});

it("preserves await timing in a loop-header home object", async () => {
  await expectSameEvaluation(
    `return (async () => {
       const objects = [], log = [];
       let i = 0, ticks = 0;
       const tick = () => { if (++ticks < 10) queueMicrotask(tick); };
       queueMicrotask(tick);
       while (i++ < 2 && objects.push({
         ...{}, __proto__: { x: await Promise.resolve(i) }, m() { return super.x; }
       })) {
         log.push(ticks);
       }
       return [objects.map(object => object.m()), log];
     })();`,
    FEATURES.objectSpread,
  );
});

it("preserves the environment and yields of a loop-header home object", () => {
  expectSameEvaluation(
    `class C extends class { get x() { return 3; } } {
       *make(value) {
         const objects = [];
         let i = 0;
         while (i++ < 2 && objects.push({
           ...{ value: arguments[0] },
           __proto__: { x: (yield i) + super.x + this.offset },
           m() { return super.x + this.value; }
         })) {}
         return objects.map(object => object.m());
       }
     }
     const instance = new C();
     instance.offset = 4;
     const iterator = instance.make(5);
     return [iterator.next(), iterator.next(6), iterator.next(7)];`,
    FEATURES.objectSpread,
  );
});

it.each(["+coercible", "`${coercible}`", "coercible + 0"])(
  "captures earlier array values before coercing %s",
  expression => {
    for (const pattern of [
      "const [first, second]",
      "let first, second; [first, second]",
      "const [first, ...second]",
      "const [[first], second]",
    ]) {
      expectSameEvaluation(
        `let value = 1;
         const coercible = {
           valueOf() { value = 2; return 3; },
           toString() { value = 2; return "three"; }
         };
         ${pattern} = [${pattern.includes("[[") ? "[value]" : "value"}, ${expression}];
         return [first, second];`,
        FEATURES.destructuring,
      );
    }
  },
);

it.each([
  `function f({ a, ...rest }, value = 1) { value = 2; return [arguments[1], (() => arguments[0])()]; } return f({ a: 1 }, 3);`,
  `function f({ a, ...rest }, value) { value = 2; return eval("arguments[1]"); } return f({ a: 1 }, 3);`,
  `function f({ a, ...rest }, value) { function inner() { return arguments[0]; } return [inner(2), { arguments: value }]; } return f({ a: 1 }, 3);`,
])("preserves argument environments when lowering object rest: %s", input => {
  expectSameEvaluation(input, FEATURES.objectRest);
});

it("handles public classes with private destructuring enabled", () => {
  expectSameEvaluation(
    `class Plain { run(value) { const { a, ...rest } = value; return [a, rest]; } }
     return new Plain().run({ a: 1, b: 2 });`,
    FEATURES.privateDestructuring |
      FEATURES.destructuring |
      FEATURES.objectRest,
  );
});

it.each(["+key", "key + 0", "`${key}`", "{ [key]: 1 }", "+1n"])(
  "keeps a parameter default %s after earlier destructuring",
  expression => {
    for (const param of ["b", "{ b, ...laterRest }"]) {
      expectSameEvaluation(
        `
          const log = [];
          const key = {
            valueOf() { log.push("valueOf"); return 2; },
            toString() { log.push("toString"); return "b"; }
          };
          function f({ a, ...rest }, ${param} = ${expression}) {}
          for (const source of [{ get a() { log.push("get"); return 1; } }, null]) {
            try { f(source); } catch (error) { log.push(error.name); }
          }
          return log;
        `,
        FEATURES.objectRest,
      );
    }
  },
);

it("keeps a parameter default in its TDZ after earlier destructuring", () => {
  expectSameEvaluation(
    `const log = [];
     function f({ a, ...rest }, b = key) {}
     try { f({ get a() { log.push("get"); return 1; } }); }
     catch (error) { log.push(error.name); }
     const key = 2;
     return log;`,
    FEATURES.objectRest,
  );
});

it.each(["1n / 0n", "+1n", "1n + 1", "1n >>> 0n"])(
  "evaluates a throwing computed key %s before the assignment target",
  key => {
    for (const target of ["missing.x", "null.x", "missing.x = 0"]) {
      expectSameEvaluation(
        `try { ({ [${key}]: ${target} } = {}); }
         catch (error) { return error.name; }`,
        FEATURES.destructuring,
      );
    }
  },
);
const patterns = [
  "const { [KEY]: value = fallback(), ...rest } = source; return [log, value, rest];",
  "let value, rest; ({ [KEY]: value = fallback(), ...rest } = source); return [log, value, rest];",
  "({ [KEY]: target().value = fallback() } = source); return [log, result];",
  "({ [KEY]: target().value = fallback(), ...target().rest } = source); return [log, result];",
];

describe.each([
  ["object rest", FEATURES.objectRest],
  ["full destructuring", FEATURES.objectRest | FEATURES.destructuring],
])("%s", (_name, feature) => {
  it.each([false, true])(
    "copies a rest-only Proxy in key order (useBuiltIns: %s)",
    useBuiltIns => {
      for (const objectRestNoSymbols of [false, true]) {
        for (const pattern of [
          "const { ...rest } = source;",
          "let rest; ({ ...rest } = source);",
          "let rest; const receiver = {}; function targetRef() { log.push('target'); return receiver; } ({ ...targetRef().value } = source); rest = receiver.value;",
          "let rest; function f({ ...value }) { rest = value; } f(source);",
          "let rest; for (const { ...value } of [source]) rest = value;",
          "let rest; try { throw source; } catch ({ ...value }) { rest = value; }",
        ]) {
          expectSameEvaluation(
            `
              const log = [];
              const symbol = Symbol("key");
              const target = { a: 1, ["__proto__"]: { own: true }, b: 2 };
              Object.defineProperty(target, "hidden", { value: 4 });
              if (!${objectRestNoSymbols}) target[symbol] = 3;
              const source = new Proxy(target, {
                ownKeys() {
                  log.push("keys");
                  return ${objectRestNoSymbols}
                    ? ["b", "hidden", "__proto__", "a"]
                    : [symbol, "b", "hidden", "__proto__", "a"];
                },
                getOwnPropertyDescriptor(target, key) {
                  log.push(["descriptor", String(key)]);
                  return Reflect.getOwnPropertyDescriptor(target, key);
                },
                get(target, key, receiver) {
                  log.push(["get", String(key)]);
                  return Reflect.get(target, key, receiver);
                },
                getPrototypeOf() { throw new Error("prototype visited"); }
              });
              ${pattern}
              return [
                log,
                Reflect.ownKeys(rest).map(String),
                Object.getOwnPropertyDescriptor(rest, "__proto__"),
                Object.getPrototypeOf(rest) === Object.prototype,
                rest.a, rest.b, rest[symbol]
              ];
            `,
            feature,
            { useBuiltIns, objectRestNoSymbols },
          );
        }
      }
    },
  );

  it.each(["none", "descriptor", "value"])(
    "interleaves rest-only descriptors and reads until %s throws",
    throwing => {
      expectSameEvaluation(
        `
          const log = [];
          const target = { a: 1, b: 2, c: 3 };
          const source = new Proxy(target, {
            ownKeys(target) { log.push("keys"); return Reflect.ownKeys(target); },
            getOwnPropertyDescriptor(target, key) {
              log.push(["descriptor", key]);
              if (key === "b" && ${JSON.stringify(throwing)} === "descriptor") throw new Error("descriptor");
              return Reflect.getOwnPropertyDescriptor(target, key);
            },
            get(target, key) {
              log.push(["get", key]);
              if (key === "b" && ${JSON.stringify(throwing)} === "value") throw new Error("value");
              if (key === "a" && ${JSON.stringify(throwing)} === "none") delete target.b;
              return target[key];
            },
            getPrototypeOf() { log.push("prototype"); return Object.prototype; }
          });
          try { const { ...rest } = source; log.push(Object.keys(rest)); }
          catch (error) { log.push(error.message); }
          return log;
        `,
        feature,
      );
    },
  );

  it.each(["{ omitted, ...rest }", "{ ...rest }"])(
    "copies an own __proto__ data property with %s",
    pattern => {
      for (const objectRestNoSymbols of [false, true]) {
        expectSameEvaluation(
          `
            const proto = { inherited: true };
            const source = { ["__proto__"]: proto, omitted: 1, other: 2 };
            const ${pattern} = source;
            return [
              Object.getPrototypeOf(rest) === Object.prototype,
              Object.getOwnPropertyDescriptor(rest, "__proto__"),
              Object.keys(rest)
            ];
          `,
          feature,
          { objectRestNoSymbols },
        );
      }
    },
  );

  it.each(keyExpressions)("coerces %s once and in order", expression => {
    for (const pattern of patterns) {
      expectSameEvaluation(
        `
          const log = [];
          const key = {
            [Symbol.toPrimitive](hint) { log.push(hint); return "1"; }
          };
          const source = {
            get 1() { log.push("get"); return undefined; },
            other: 2
          };
          const result = {};
          const target = () => (log.push("target"), result);
          const fallback = () => (log.push("default"), 3);
          ${pattern.replace("KEY", expression)}
          `,
        feature,
      );
    }
  });

  it.each(keyExpressions)("checks null before evaluating %s", expression => {
    expectSameEvaluation(
      `
        const log = [];
        const key = { [Symbol.toPrimitive]() { log.push("key"); return "1"; } };
        try { const { [${expression}]: value, ...rest } = null; }
        catch (error) { log.push(error.name); }
        return log;
        `,
      feature,
    );
  });

  it.each(keyExpressions)("keeps unused key coercion for %s", expression => {
    expectSameEvaluation(
      `
        const log = [];
        const key = { [Symbol.toPrimitive](hint) { log.push(hint); return "1"; } };
        const { [${expression}]: unused, ...rest } = { 1: 1, other: 2 };
        return [log, rest];
        `,
      feature,
      { pureGetters: true },
    );
  });

  it("preserves mutable primitive keys and assignment targets", () => {
    expectSameEvaluation(
      `
        let key = false, result = {}, value;
        key = true;
        result = {};
        ({ [!key]: result.value } = { false: 1 });
        ({ [!key]: value, ...result.rest } = { false: 1, other: 2 });
        return [result, value];
        `,
      feature,
    );
  });

  it("coerces a shadowed Symbol member before excluding it", () => {
    expectSameEvaluation(
      `
        const log = [];
        const key = { [globalThis.Symbol.toPrimitive]() { log.push("key"); return "a"; } };
        const Symbol = { iterator: key };
        const { [Symbol.iterator]: value, ...rest } = { a: 1, b: 2 };
        return [log, value, rest];
        `,
      feature,
    );
  });
});

it.each(keyExpressions)(
  "evaluates the array RHS before a default %s",
  expression => {
    for (const pattern of ["[a = EXPR, b]", "[[a = EXPR], b]"]) {
      const values = pattern.startsWith("[[")
        ? "[[undefined], n]"
        : "[undefined, n]";
      expectSameEvaluation(
        `
      let n = 1;
      const key = { [Symbol.toPrimitive]() { n = 2; return "1"; } };
      const ${pattern.replace("EXPR", expression)} = ${values};
      return [a === key ? "key" : a, b, n];
      `,
        FEATURES.destructuring,
      );
    }
  },
);

it.each([
  [
    "unbound RHS",
    `let a = 0, b; try { [a, b] = [1, missing]; } catch (error) { return [a, error.name]; }`,
  ],
  [
    "RHS in its TDZ",
    `let a = 0, b; try { [a, b] = [1, late]; } catch (error) { return [a, error.name]; } const late = 2;`,
  ],
  [
    "throwing primitive coercion",
    `let a = 0, b; try { [a, b] = [1, +1n]; } catch (error) { return [a, error.name]; }`,
  ],
  [
    "nested throwing RHS",
    `let a = 0, b; try { [a, b] = [1, { value: late }]; } catch (error) { return [a, error.name]; } const late = 2;`,
  ],
  [
    "derived constructor this",
    `let a = 0, b; class C extends Object { constructor() { try { [a, b] = [1, this]; } catch (error) { return { a, error: error.name }; } } } return new C();`,
  ],
  [
    "class static name",
    `const { C = class { static value = this.name; } } = {}; return [C.name, C.value];`,
  ],
  [
    "class static name override",
    `const { C = class { static before = this.name; static name = "custom"; } } = {}; return [C.name, C.before];`,
  ],
  [
    "computed class member",
    `const key = "other"; const { C = class { static [key] = 1; static value = this.name; } } = {}; return [C.name, C.value];`,
  ],
  [
    "computed class name override",
    `const key = "name"; const { C = class { static before = this.name; static [key] = "custom"; } } = {}; return [C.name, C.before];`,
  ],
  [
    "class default named __proto__",
    `const { __proto__ = class { static value = this.name; } } = { __proto__: null }; return [__proto__.name, __proto__.value];`,
  ],
  [
    "source key changes target",
    `let obj = {}; const old = obj; const key = { [Symbol.toPrimitive]() { obj = {}; return "a"; } }; ({ a: obj.x } = { [key]: 1 }); return [old.x, obj.x];`,
  ],
  [
    "null member target",
    `const log = []; const target = null; const source = { get a() { log.push("get"); return 1; } }; try { ({ a: target.x = 2 } = source); } catch (error) { log.push(error.name); } return log;`,
  ],
  [
    "nested null member target",
    `const log = []; const target = null; const source = { get a() { log.push("get"); return {}; } }; try { ({ a: { b: target.x } } = source); } catch (error) { log.push(error.name); } return log;`,
  ],
  [
    "source TDZ before null target",
    `const target = null; try { ({ a: target.x } = source); } catch (error) { return error.name; } const source = {};`,
  ],
  [
    "unused object RHS in its TDZ",
    `try { const {} = { value: late }; } catch (error) { return error.name; } const late = 1;`,
  ],
])("preserves %s", (_name, input) => {
  expectSameEvaluation(input, FEATURES.destructuring);
});

it.each([
  ["anonymous array element", `const [f] = [function () {}]; return f.name;`],
  ["anonymous arrow array element", `const [f] = [() => {}]; return f.name;`],
  [
    "anonymous class array element",
    `const [C] = [class { static value = this.name; }]; return [C.name, C.value];`,
  ],
  [
    "anonymous function RHS",
    `const { name, length } = function () {}; return [name, length];`,
  ],
  [
    "anonymous class RHS",
    `const { name, value } = class { static value = this.name; }; return [name, value];`,
  ],
  [
    "anonymous nested default",
    `const [{ name, length } = function () {}] = [undefined]; return [name, length];`,
  ],
  [
    "class default static method name",
    `const { C = class { static name() {} } } = {}; return typeof C.name;`,
  ],
  [
    "class default TDZ reference",
    `try { const { C = class { static value = C; } } = {}; } catch (error) { return error.name; }`,
  ],
  [
    "class default named __proto__ with outer reference",
    `let __proto__ = 1; ({ __proto__ = class { static value = __proto__; } } = { __proto__: null }); return [__proto__.name, __proto__.value];`,
  ],
])("preserves %s", (_name, input) => {
  expectSameEvaluation(input, FEATURES.destructuring);
});

it("checks null before coercing a newly created key object", () => {
  expectSameEvaluation(
    `
    const log = [];
    try { const { [{ toString() { log.push("key"); return "a"; } }]: value } = null; }
    catch (error) { log.push(error.name); }
    return log;
    `,
    FEATURES.destructuring,
  );
});

it.each([
  ["captured anonymous class", `const [C] = [class {}]; return C.name;`],
  [
    "captured class static field",
    `const [C] = [class { static value = 1; }]; return [C.name, C.value];`,
  ],
])("preserves %s", (_name, input) => {
  expectSameEvaluation(input, FEATURES.destructuring);
});

it("preserves global references in a class default named __proto__", () => {
  expectSameEvaluation(
    `
    const before = __proto__;
    ({ __proto__ = class { static value = __proto__; } } = { __proto__: null });
    return [__proto__.name, __proto__.value === before];
    `,
    FEATURES.destructuring,
    {},
    code => compileFunction(code, [], { parsingContext: createContext() })(),
  );
});

it.each([
  [
    "function default from void",
    `const [f = function () {}] = [void 0]; return f.name;`,
  ],
  [
    "class default from void",
    `const [C = class { static value = this.name; }] = [void 0]; return [C.name, C.value];`,
  ],
  [
    "class default named __proto__ in its TDZ",
    `try { const { __proto__ = class { static value = __proto__; } } = { __proto__: null }; } catch (error) { return error.name; }`,
  ],
])("preserves %s", (_name, input) => {
  expectSameEvaluation(input, FEATURES.destructuring);
});

it("keeps global writes and shadowed class parameters distinct", () => {
  expectSameEvaluation(
    `
    class Other {}
    const before = __proto__;
    ({ __proto__ = class {
      static current() { return __proto__; }
      static local(__proto__) { return __proto__; }
      static change(value) { __proto__ = value; }
    } } = { __proto__: null });
    const C = __proto__;
    C.change(before);
    return [C.name, C.current() === before, C.local(7), __proto__ === before];
    `,
    FEATURES.destructuring,
    {},
    code => compileFunction(code, [], { parsingContext: createContext() })(),
  );
});
