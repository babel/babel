import * as babel7_12 from "@babel/core-7.12";
import * as babel from "@babel/core";
import env from "../lib/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { USE_ESM, commonJS } from "$repo-utils";

const { require } = commonJS(import.meta.url);

const itBabel7 = process.env.BABEL_8_BREAKING ? it.skip : it;
const itBabel7Node14plusCjs =
  process.env.BABEL_8_BREAKING ||
  parseInt(process.versions.node) < 14 ||
  USE_ESM
    ? it.skip
    : it;

describe("regressions", () => {
  it("empty", () => {
    // TODO(Babel 8): Delete this file
  });

  itBabel7(
    "#12880 - read the .browserslistrc file when using @babel/core < 7.13.0",
    () => {
      const root = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "regressions",
      );

      // Unfortunatly, when loading the browserslist config through
      // @babel/preset-env, it's resolved from process.cwd() and not
      // from root. Mock it to isolate this test.
      const spy = jest.spyOn(process, "cwd").mockReturnValue(root);

      try {
        // The browserslistrc file contains "firefox 50".
        // a ** b is supported starting from firefox 52;
        // a => b is supported starting from firefox 45.
        const out = babel7_12.transformSync("a ** b; a => b;", {
          configFile: false,
          presets: [[env, { modules: false }]],
          filename: path.join(root, "input.js"),
          root,
        });

        expect(out.code).toMatchInlineSnapshot(`
                    "Math.pow(a, b);
                    a => b;"
                `);
      } finally {
        spy.mockRestore();
      }
    },
  );

  // create-reat-app missing dependency fallback
  // jest fake timers only work in the Jest version we are using for Node.js 14+
  itBabel7Node14plusCjs(
    "proposal-private-property-in-object should warn and fallback to transform-...",
    () => {
      jest.useFakeTimers();
      const consoleWarn = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      try {
        const out = babel.transformSync("class A { #a; x = #a in this }", {
          configFile: false,
          presets: [require("./regressions/babel-preset-react-app/index.js")],
        });

        jest.advanceTimersByTime(5000);
        expect(consoleWarn).toHaveBeenCalled();

        expect(out.code).toMatchInlineSnapshot(`
        "function _checkInRHS(value) { if (Object(value) !== value) throw TypeError(\\"right-hand side of 'in' should be an object, got \\" + (null !== value ? typeof value : \\"null\\")); return value; }
        var _aBrandCheck = /*#__PURE__*/new WeakSet();
        class A {
          #a = void _aBrandCheck.add(this);
          x = _aBrandCheck.has(_checkInRHS(this));
        }"
      `);
      } finally {
        jest.useRealTimers();
        consoleWarn.mockRestore();
      }
    },
  );
});
