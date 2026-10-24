import { transformSync } from "@babel/core";
import { createDestructuringPlugin, FEATURES } from "../lib/index.js";
import checkScopeInfo from "./helpers/checkScopeInfo.js";

function expectSameEvaluation(input, feature, options = {}) {
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
  expect(new Function(code)()).toEqual(new Function(source)());
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
