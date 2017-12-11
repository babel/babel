import * as t from "../lib";
import assert from "assert";

describe("asserts", () => {
  const consoleTrace = console.trace;

  beforeEach(() => {
    console.trace = () => {};
  });

  afterEach(() => {
    console.trace = consoleTrace;
  });

  Object.keys(t).forEach(k => {
    if (k.startsWith("assert") && k !== "assertNode") {
      const nodeType = k.replace("assert", "");

      it(nodeType, () => {
        assert.throws(
          () => {
            t[k]({ type: "FlavorTownDeclaration" }, {});
          },
          err => {
            return (
              err instanceof Error &&
              err.message ===
                `Expected type "${nodeType}" with option {}, but instead got "FlavorTownDeclaration".`
            );
          },
        );
      });
    }
  });
});
