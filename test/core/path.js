var babel = require("../../lib/babel/api/node");
var chai  = require("chai");

suite("traversal path", function () {
  test("replaceWithSourceString", function () {
    var expectCode = "function foo() {}";

    var actualCode = babel.transform(expectCode, {
      blacklist: "strict",
      plugins: [new babel.Transformer("foobar", {
        FunctionDeclaration: function () {
          return "console.whatever()";
        }
      })]
    }).code;

    chai.expect(actualCode).to.be.equal("console.whatever();");
  });
});
