// React JSX tests

if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
  var testAssert = require("./driver.js").testAssert;
}

test('<a />', {
  type: 'Program',
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "XJSElement",
        openingElement: {
          type: "XJSOpeningElement",
          name: {
            type: "XJSIdentifier",
            name: "a",
            start: 1,
            end: 2,
            loc: {
              start: { line: 1, column: 1 },
              end: { line: 1, column: 2 }
            }
          },
          selfClosing: true,
          attributes: [],
          start: 0,
          end: 5,
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 5 }
          }
        },
        children: [],
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0 },
          end: { line: 1, column: 5 }
        }
      },
      start: 0,
      end: 5,
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 5 }
      }
    }
  ]
}, {locations: true});