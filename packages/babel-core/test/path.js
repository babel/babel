var transform = require("../lib/api/node").transform;
var Plugin    = require("../lib/transformation/plugin");
var babel     = require("../lib/api/node");
var chai      = require("chai");

suite("traversal path", function () {
  test("replaceWithSourceString", function () {
    var expectCode = "function foo() {}";

    var actualCode = transform(expectCode, {
      plugins: [new Plugin({
        visitor: {
          FunctionDeclaration: function (path) {
            path.replaceWithSourceString("console.whatever()");
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("console.whatever();");
  });

  test("replaceWith (arrow expression body to block statement body)", function () {
    var expectCode = "var fn = () => true;";

    var actualCode = transform(expectCode, {
      plugins: [new Plugin({
        visitor: {
          ArrowFunctionExpression: function (path) {
            path.get("body").replaceWith({
              type: "BlockStatement",
              body: [{
                type: "ReturnStatement",
                argument: {
                  type: "BooleanLiteral",
                  value: true
                }
              }]
            });
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("var fn = () => {\n  return true;\n};");
  });

  test("replaceWith (arrow block statement body to expression body)", function () {
    var expectCode = "var fn = () => { return true; }";

    var actualCode = transform(expectCode, {
      plugins: [new Plugin({
        visitor: {
          ArrowFunctionExpression: function (path) {
            path.get("body").replaceWith({
              type: "BooleanLiteral",
              value: true
            });
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("var fn = () => true;");
  });

  test("replaceWith (for-in left expression to variable declaration)", function () {
    var expectCode = "for (KEY in right);";

    var actualCode = transform(expectCode, {
      plugins: [new Plugin({
        visitor: {
          ForInStatement: function (path) {
            path.get("left").replaceWith({
              type: "VariableDeclaration",
              kind: "var",
              declarations: [{
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "KEY"
                }
              }]
            });
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("for (var KEY in right);");
  });

  test("replaceWith (for-in left variable declaration to expression)", function () {
    var expectCode = "for (var KEY in right);";

    var actualCode = transform(expectCode, {
      plugins: [new Plugin({
        visitor: {
          ForInStatement: function (path) {
            path.get("left").replaceWith({
              type: "Identifier",
              name: "KEY"
            });
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("for (KEY in right);");
  });

  test("replaceWith (for-loop left expression to variable declaration)", function () {
    var expectCode = "for (KEY;;);";

    var actualCode = transform(expectCode, {
      plugins: [new Plugin({
        visitor: {
          ForStatement: function (path) {
            path.get("init").replaceWith({
              type: "VariableDeclaration",
              kind: "var",
              declarations: [{
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "KEY"
                }
              }]
            });
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("for (var KEY;;);");
  });

  test("replaceWith (for-loop left variable declaration to expression)", function () {
    var expectCode = "for (var KEY;;);";

    var actualCode = transform(expectCode, {
      plugins: [new Plugin({
        visitor: {
          ForStatement: function (path) {
            path.get("init").replaceWith({
              type: "Identifier",
              name: "KEY"
            });
          }
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("for (KEY;;);");
  });
});
