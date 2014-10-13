var traverse = require("../lib/6to5/traverse");
var assert   = require("assert");
var _        = require("lodash");

suite("traverse", function () {
  var ast = {
    type: "Program",
    body: [
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
    ]
  };

  var body = ast.body;

  test("hasType", function () {
    assert.ok(traverse.hasType(ast, "ThisExpression"));
    assert.ok(!traverse.hasType(ast, "ThisExpression", ["AssignmentExpression"]));
  });

  test("traverse", function () {
    var expect = [
      body[0], body[0].declarations[0], body[0].declarations[0].id, body[0].declarations[0].init,
      body[1], body[1].expression, body[1].expression.left, body[1].expression.left.object, body[1].expression.left.property, body[1].expression.right
    ];

    var actual = [];

    traverse(ast, function (node) {
      actual.push(node);
    });

    assert.deepEqual(actual, expect);
  });

  test("traverse falsy parent", function () {
    traverse(null, function () {
      throw new Error("should not be ran");
    });
  });

  test("traverse unknown type", function () {
    traverse({
      type: "FooBar"
    }, function () {
      throw new Error("should not be ran");
    });
  });

  test("traverse blacklistTypes", function () {
    var expect = [
      body[0], body[0].declarations[0], body[0].declarations[0].id, body[0].declarations[0].init,
      body[1], body[1].expression, body[1].expression.right
    ];

    var actual = [];

    traverse(ast, function (node) {
      actual.push(node);
    }, ["MemberExpression"]);

    assert.deepEqual(actual, expect);
  });

  test("traverse replace", function () {
    var replacement = {
      type: "Literal",
      value: "foo"
    };
    var ast2 = _.cloneDeep(ast);

    traverse(ast2, function (node) {
      if (node.type === "ThisExpression") return replacement;
    });

    assert.equal(ast2.body[1].expression.left.object, replacement);
  });

  test("traverse delete", function () {
    var ast2 = _.cloneDeep(ast);

    traverse(ast2, function (node) {
      if (node.type === "VariableDeclaration") return traverse.Delete;
    });

    assert.deepEqual(ast2, {
      type: "Program",
      body: [body[1]]
    });
  });

  test("traverse delete required", function () {
    assert.throws(function () {
      var ast2 = _.cloneDeep(ast);
      traverse(ast2, function (node) {
        if (node.type === "ThisExpression") return traverse.Delete;
      });
    }, /trying to delete property object from MemberExpression but can't because it's required/);
  });

  test("hasType");
});
