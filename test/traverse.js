var traverse = require("../lib/6to5/traverse");
var assert   = require("assert");

suite("traverse", function () {
  test("hasType", function () {
    assert.ok(traverse.hasType([
      {
        "type": "VariableDeclaration",
        "declarations": [
          {
            "type": "VariableDeclarator",
            "id": {
              "type": "Identifier",
              "name": "foo",
            },
            "init": {
              "type": "Literal",
              "value": "bar",
              "raw": "\'bar\'"
            }
          }
        ],
        "kind": "var"
      },
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "operator": "=",
          "left": {
            "type": "MemberExpression",
            "computed": false,
            "object": {
              "type": "ThisExpression"
            },
            "property": {
              "type": "Identifier",
              "name": "test"
            }
          },
          "right": {
            "type": "Literal",
            "value": "wow",
            "raw": "\'wow\'"
          }
        }
      }
    ], "ThisExpression"));
  });
});
