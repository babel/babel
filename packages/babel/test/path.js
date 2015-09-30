var transform = require("../lib/transformation");
var Plugin    = require("../lib/transformation/plugin");
var babel     = require("../lib/api/node");
var chai      = require("chai");

suite("traversal path", function () {
  test("replaceWithSourceString", function () {
    var expectCode = "function foo() {}";

    var actualCode = transform(expectCode, {
      blacklist: "strict",
      plugins: [new Plugin("foobar", {
        visitor: {
          FunctionDeclaration: function () {
            this.replaceWithSourceString("console.whatever()");
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("console.whatever();");
  });

  test("replaceWith (arrow expression body to block statement body)", function () {
    var expectCode = "var fn = () => true;";

    var actualCode = transform(expectCode, {
      blacklist: "strict",
      plugins: [new Plugin("foobar", {
        visitor: {
          ArrowFunctionExpression: function () {
            this.get("body").replaceWith({
              type: "BlockStatement",
              body: [{
                type: "ReturnStatement",
                argument: {
                  type: "Literal",
                  value: true
                }
              }]
            });
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("var fn = function fn() {\n  return true;\n};");
  });

  test("replaceWith (arrow block statement body to expression body)", function () {
    var expectCode = "var fn = () => { return true; }";

    var actualCode = transform(expectCode, {
      blacklist: "strict",
      plugins: [new Plugin("foobar", {
        visitor: {
          ArrowFunctionExpression: function () {
            this.get("body").replaceWith({
              type: "Literal",
              value: true
            });
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("var fn = function fn() {\n  return true;\n};");
  });
});
