let transform = require("../lib/api/node").transform;
let Plugin    = require("../lib/transformation/plugin");
let chai      = require("chai");

suite("traversal path", function () {
  test("replaceWithSourceString", function () {
    let expectCode = "function foo() {}";

    let actualCode = transform(expectCode, {
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
    let expectCode = "var fn = () => true;";

    let actualCode = transform(expectCode, {
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
    let expectCode = "var fn = () => { return true; }";

    let actualCode = transform(expectCode, {
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
    let expectCode = "for (KEY in right);";

    let actualCode = transform(expectCode, {
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
    let expectCode = "for (var KEY in right);";

    let actualCode = transform(expectCode, {
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
    let expectCode = "for (KEY;;);";

    let actualCode = transform(expectCode, {
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
    let expectCode = "for (var KEY;;);";

    let actualCode = transform(expectCode, {
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
