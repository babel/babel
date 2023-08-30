import * as babel7_12 from "@babel/core-7.12";
import * as babel from "@babel/core";
import env from "../lib/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { commonJS, itBabel7, itBabel7GteNoESM } from "$repo-utils";

const { require } = commonJS(import.meta.url);

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

      // Unfortunately, when loading the browserslist config through
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

  const itBabel7NodeGte14NoESM = itBabel7GteNoESM("14.0.0");
  // create-reat-app missing dependency fallback
  // jest fake timers only work in the Jest version we are using for Node.js 14+
  itBabel7NodeGte14NoESM(
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
        "function _checkInRHS(e) { if (Object(e) !== e) throw TypeError(\\"right-hand side of 'in' should be an object, got \\" + (null !== e ? typeof e : \\"null\\")); return e; }
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
