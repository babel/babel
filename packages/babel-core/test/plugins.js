import runner from "@babel/helper-transform-fixture-test-runner";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as babel from "../lib/index.js";

(runner.default || runner)(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/plugins"),
  "plugins",
);

function transform(code, opts) {
  opts = opts || {};
  opts.configFile = false;
  opts.babelrc = false;
  return babel.transformSync(code, opts);
}

describe("plugins misc", () => {
  it("build code frame error", () => {
    expect(() => {
      const code = "function f() {}";
      transform(code, {
        plugins: [
          function () {
            return {
              visitor: {
                FunctionDeclaration: function (path) {
                  throw path.buildCodeFrameError("someMsg");
                },
              },
            };
          },
        ],
        // hard to assert on ANSI escape codes
        highlightCode: false,
      });
    }).toThrow(/^unknown file: someMsg\s+> 1 \| function f\(\) \{\}/);
  });

  it("nested if alternate", () => {
    const res = transform("", {
      plugins: [
        function (b) {
          const t = b.types;
          return {
            visitor: {
              Program: function (path) {
                if (this.done) return;
                // if (false) { if (true) 42; } else 23;
                const inner = t.ifStatement(
                  t.booleanLiteral(true),
                  t.expressionStatement(t.numericLiteral(42)),
                  null,
                );
                const outer = t.ifStatement(
                  t.booleanLiteral(false),
                  inner,
                  t.expressionStatement(t.numericLiteral(23)),
                );
                path.replaceWith(t.program([outer]));
                this.done = true;
              },
            },
          };
        },
      ],
    });

    expect(eval(res.code)).toBe(23);
  });

  it("transform error", () => {
    const code = "function f() {}";
    let e;
    try {
      transform(code, {
        plugins: [
          function () {
            return {
              visitor: {
                FunctionDeclaration: function () {
                  throw new Error("someMsg");
                },
              },
            };
          },
        ],
        filename: "/fake/path/example.js",
      });
    } catch (error) {
      e = error;
    }
    expect(e.message).toContain("someMsg");
  });

  it("inference recursion", () => {
    const code = `function () {
      let kind;
      function readObj() {
        expect("{");
        if (!skip("}")) {
          do {
            expect("String");
            expect(":");
            readVal();
          } while (skip(","));
          expect("}");
        }
      }

      function expect(str) {
        if (kind === str) {
          return lex();
        }
        throw syntaxError(
          "Expected " + str + " but got " + string.slice(start, end) + ".",
        );
      }

      function readArr() {
        expect("[");
        if (!skip("]")) {
          do {
            readVal();
          } while (skip(","));
          expect("]");
        }
      }

      function readVal() {
        switch (kind) {
          case "[":
            return readArr();
          case "{":
            return readObj();
          case "String":
            return lex();
          default:
            return expect("Value");
        }
      }
    }`
      .split("\n")
      .slice(1, -1)
      .join("\n");

    transform(code, {
      plugins: [
        function () {
          return {
            visitor: {
              BinaryExpression: function (path) {
                path.get("left").baseTypeStrictlyMatches(path.get("right"));
              },
            },
          };
        },
      ],
    });
  });

  it("multiple definition evaluation", () => {
    const code = `
  function foo() {
    var a = a ? a : a;
  }
`;
    transform(code, {
      plugins: [
        function () {
          return {
            visitor: {
              ConditionalExpression: function (path) {
                path.get("test").evaluateTruthy();
              },
            },
          };
        },
      ],
    });
  });

  it("regression 2772", () => {
    const code = `
  (function() {
    var bar = 'lol';
    function foo(b){
      b === bar
      foo(b);
    }
  })();
`;

    transform(code, {
      plugins: [
        function (b) {
          const t = b.types;
          return {
            visitor: {
              // Replace block statements with a new node without changing anything
              BlockStatement: function (path) {
                if (path.node.seen) {
                  return;
                }

                const node = t.blockStatement(path.node.body);
                node.seen = true;
                path.replaceWith(node);
              },

              // do type inference
              BinaryExpression: function (path) {
                const left = path.get("left");
                const right = path.get("right");
                left.baseTypeStrictlyMatches(right);
              },
            },
          };
        },
      ],
    });
  });
});
