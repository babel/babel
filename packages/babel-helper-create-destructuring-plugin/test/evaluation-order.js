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
      api =>
        createDestructuringPlugin({
          name: "test-destructuring",
          feature,
          options,
          api,
        }),
      checkScopeInfo,
    ],
  });
  expect(evaluate(code)).toEqual(evaluate(source));
}

const keyExpressions = ["key", "+key", "-key", "~key", "`${key}`", 'key + ""'];
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
