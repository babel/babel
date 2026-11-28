import { transformSync } from "@babel/core";
import transformTypeScript from "../lib/index.js";

describe("namespace scope information", () => {
  function getAssignments(code, name) {
    let assignments;
    transformSync(code, {
      configFile: false,
      filename: "input.ts",
      plugins: [
        transformTypeScript,
        () => ({
          visitor: {
            Program: {
              exit(path) {
                assignments = path.scope
                  .getBinding(name)
                  .constantViolations.map(p => p.toString());
              },
            },
          },
        }),
      ],
    });
    return assignments;
  }

  it("registers the namespace assignment", () => {
    expect(getAssignments("namespace N { export const x = 1; }", "N")).toEqual([
      "N = {}",
    ]);
  });

  it("registers the namespace assignment of a merged binding", () => {
    expect(
      getAssignments(
        "function N() {} namespace N { export const x = 1; }",
        "N",
      ),
    ).toEqual(["N = {}"]);
  });

  it("registers the assignment of an exported namespace", () => {
    expect(
      getAssignments("export namespace N { export const x = 1; }", "N"),
    ).toEqual(["N = {}"]);
  });
});
