// React JSX tests

if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
  var testAssert = require("./driver.js").testAssert;
}

// Simply taken from esprima-fb/fbtest.js
var fbTestFixture = {
  'XJS': {
    '<a />': {
      type: "ExpressionStatement",
      expression: {
        type: "XJSElement",
        openingElement: {
          type: "XJSOpeningElement",
          name: {
            type: "XJSIdentifier",
            name: "a",
            range: [1, 2],
            loc: {
              start: { line: 1, column: 1 },
              end: { line: 1, column: 2 }
            }
          },
          selfClosing: true,
          attributes: [],
          range: [0, 5],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 5 }
          }
        },
        children: [],
        range: [0, 5],
        loc: {
          start: { line: 1, column: 0 },
          end: { line: 1, column: 5 }
        }
      },
      range: [0, 5],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 5 }
      }
    },
    '<a\n/>': {
      type: "ExpressionStatement",
      expression: {
        type: "XJSElement",
        openingElement: {
          type: "XJSOpeningElement",
          name: {
            type: "XJSIdentifier",
            name: "a",
            range: [
              1,
              2
            ],
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 2
              }
            }
          },
          selfClosing: true,
          attributes: [],
          range: [
            0,
            5
          ],
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 2,
              column: 2
            }
          }
        },
        children: [],
        range: [
          0,
          5
        ],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 2
          }
        }
      },
      range: [
        0,
        5
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 2
        }
      }
    },
    '<日本語></日本語>': {
      type: "ExpressionStatement",
      expression: {
        type: "XJSElement",
        openingElement: {
          type: "XJSOpeningElement",
          name: {
            type: "XJSIdentifier",
            name: "日本語",
            range: [
              1,
              4
            ],
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 4
              }
            }
          },
          selfClosing: false,
          attributes: [],
          range: [
            0,
            5
          ],
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        closingElement: {
          type: "XJSClosingElement",
          name: {
            type: "XJSIdentifier",
            name: "日本語",
            range: [
              7,
              10
            ],
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          range: [
            5,
            11
          ],
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        children: [],
        range: [
          0,
          11
        ],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      },
      range: [
        0,
        11
      ],
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  }
};

// patching test data to match acorn-specific format instead of esprima-specific one
function esprima2acorn(ast, isTopLevel) {
  if ('range' in ast) {
    ast.start = ast.range[0];
    ast.end = ast.range[1];
    delete ast.range;
  }

  for (var subPropName in ast) {
    var subProp = ast[subPropName];
    if (typeof subProp === 'object' && subProp !== null) {
      ast[subPropName] = esprima2acorn(subProp);
    }
  }

  if (isTopLevel) {
    ast = {
      type: 'Program',
      body: [ast],
      start: ast.start,
      end: ast.end
    };
  }

  return ast;
}

for (var code in fbTestFixture.XJS) {
  test(code, esprima2acorn(fbTestFixture.XJS[code], true), {locations: true});
}