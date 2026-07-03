import runner from "@babel/helper-plugin-test-runner";
import * as babel from "@babel/core";

import transformBlockScoping from "../lib/index.js";

runner(import.meta.url);

describe("misc", () => {
  it("issue 10339", async () => {
    const code = `
  for (const {foo, ...bar} of { bar: [] }) {
    () => foo;
    const [qux] = bar;
    try {} catch (e) {
      let quux = qux;
    }
  }
`;

    let programPath;
    let forOfPath;
    let functionPath;

    await babel
      .transformAsync(code, {
        configFile: false,
        babelrc: false,
        plugins: [
          transformBlockScoping,
          {
            post({ path }) {
              programPath = path;
              path.traverse({
                ForOfStatement(path) {
                  forOfPath = path;
                },
                FunctionExpression(path) {
                  functionPath = path;
                },
              });
            },
          },
        ],
      })
      .then(() => {
        expect(Object.keys(programPath.scope.bindings)).toEqual(["foo", "bar"]);

        // for declarations should be transformed to for bindings
        expect(forOfPath.scope.bindings).toEqual({});
        // The body should be wrapped into closure
        expect(forOfPath.get("body").scope.bindings).toEqual({});

        expect(Object.keys(functionPath.scope.bindings)).toEqual([
          "foo",
          "qux",
          "quux",
        ]);
      });
  });

  it("scope bindings", async () => {
    const code = `var foo = 1;
if (x) {
  const bar = 1;
}`;

    const expected = `var foo = 1;
if (x) {
  var bar = 1;
}`;

    let innerScope = true;
    return babel
      .transformAsync(code, {
        configFile: false,
        babelrc: false,
        plugins: [
          transformBlockScoping,
          function () {
            return {
              visitor: {
                Scope: {
                  exit: function (path) {
                    if (innerScope) {
                      // eslint-disable-next-line jest/no-conditional-expect
                      expect(Object.keys(path.scope.bindings)).toHaveLength(0);
                      innerScope = false;
                      return;
                    }

                    expect(Object.keys(path.scope.bindings)).toHaveLength(2);
                  },
                },
              },
            };
          },
        ],
      })
      .then(res => {
        expect(res.code).toBe(expected);
        expect(innerScope).toBe(false);
      });
  });
});
