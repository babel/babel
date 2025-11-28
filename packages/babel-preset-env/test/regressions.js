import * as babel7_12 from "@babel/core-7.12";
import * as babel from "@babel/core";
import env from "../lib/index.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { commonJS, itBabel7GteNoESM } from "$repo-utils";

const { require } = commonJS(import.meta.url);

describe("regressions", () => {
  it("empty", () => {
    // TODO(Babel 8): Delete this file
  });

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
