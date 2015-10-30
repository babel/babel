var regenerator = require("..");
var babylon = require("babylon");
var assert = require("assert");
var babel = require("babel-core");
var t = require("babel-types");

describe("_blockHoist nodes", function() {
  it("should be hoisted to the outer body", function() {
    var foo;
    var names = [];
    var ast = babylon.parse([
      "function *foo(doNotHoistMe, hoistMe) {",
      "  var sent = yield doNotHoistMe();",
      "  hoistMe();",
      "  names.push(sent);",
      "  return 123;",
      "}"
    ].join("\n"));

    var hoistMeStmt = ast.program.body[0].body.body[1];
    t.assertExpressionStatement(hoistMeStmt);
    t.assertCallExpression(hoistMeStmt.expression);
    t.assertIdentifier(hoistMeStmt.expression.callee);
    assert.strictEqual(hoistMeStmt.expression.callee.name, "hoistMe");

    hoistMeStmt._blockHoist = 1;

    eval(babel.transformFromAst(ast, null, { plugins: [regenerator] }).code);

    assert.strictEqual(typeof foo, "function");
    assert.ok(regeneratorRuntime.isGeneratorFunction(foo));
    assert.strictEqual(names.length, 0);

    var g = foo(function doNotHoistMe() {
      names.push("doNotHoistMe");
      return "yielded";
    }, function hoistMe() {
      names.push("hoistMe");
    });

    assert.deepEqual(names, ["hoistMe"]);
    assert.deepEqual(g.next(), { value: "yielded", done: false });
    assert.deepEqual(names, ["hoistMe", "doNotHoistMe"]);
    assert.deepEqual(g.next("oyez"), { value: 123, done: true });
    assert.deepEqual(names, ["hoistMe", "doNotHoistMe", "oyez"]);
  });
});
