let traverse = require("../lib").default;
let assert   = require("assert");
let _        = require("lodash");
let parse = require("babylon").parse;

describe("traverse", function () {
  let code = `
    var foo = "bar";
    this.test = "wow";
  `;
  let ast = parse(code);
  let program = ast.program;
  let body = program.body;

  it("traverse replace", function () {
    let replacement = {
      type: "StringLiteral",
      value: "foo"
    };
    let ast2 = _.cloneDeep(program);

    traverse(ast2, {
      enter: function (path) {
        if (path.node.type === "ThisExpression") path.replaceWith(replacement);
      }
    });

    assert.equal(ast2.body[1].expression.left.object, replacement);
  });

  it("traverse", function () {
    let expect = [
      body[0], body[0].declarations[0], body[0].declarations[0].id, body[0].declarations[0].init,
      body[1], body[1].expression, body[1].expression.left, body[1].expression.left.object, body[1].expression.left.property, body[1].expression.right
    ];

    let actual = [];

    traverse(program, {
      enter: function (path) {
        actual.push(path.node);
      }
    });

    assert.deepEqual(actual, expect);
  });

  it("traverse falsy parent", function () {
    traverse(null, {
      enter: function () {
        throw new Error("should not be ran");
      }
    });
  });

  it("traverse blacklistTypes", function () {
    let expect = [
      body[0], body[0].declarations[0], body[0].declarations[0].id, body[0].declarations[0].init,
      body[1], body[1].expression, body[1].expression.right
    ];

    let actual = [];

    traverse(program, {
      blacklist: ["MemberExpression"],
      enter: function (path) {
        actual.push(path.node);
      }
    });

    assert.deepEqual(actual, expect);
  });

  it("hasType", function () {
    assert.ok(traverse.hasType(ast, null, "ThisExpression"));
    assert.ok(!traverse.hasType(ast, null, "ThisExpression", ["AssignmentExpression"]));

    assert.ok(traverse.hasType(ast, null, "ThisExpression"));
    assert.ok(traverse.hasType(ast, null, "Program"));

    assert.ok(!traverse.hasType(ast, null, "ThisExpression", ["MemberExpression"]));
    assert.ok(!traverse.hasType(ast, null, "ThisExpression", ["Program"]));

    assert.ok(!traverse.hasType(ast, null, "ArrowFunctionExpression"));
  });

  it("clearCache", function () {
    let paths = [];
    let scopes = [];
    traverse(ast, {
      Program(path) {
        scopes.push(path.scope);
        paths.push(path);
        path.stop();
      }
    });

    traverse.clearCache();

    let paths2 = [];
    let scopes2 = [];
    traverse(ast, {
      Program(path) {
        scopes2.push(path.scope);
        paths2.push(path);
        path.stop();
      }
    });

    scopes2.forEach(function (_, i) {
      assert.notStrictEqual(scopes[i], scopes2[i]);
      assert.notStrictEqual(paths[i], paths2[i]);
    });
  });

  it("clearPath", function () {
    let paths = [];
    traverse(ast, {
      enter: function (path) {
        paths.push(path);
      }
    });

    traverse.clearCache.clearPath();

    let paths2 = [];
    traverse(ast, {
      enter: function (path) {
        paths2.push(path);
      }
    });

    paths2.forEach(function (p, i) {
      assert.notStrictEqual(p, paths[i]);
    });
  });

  it("clearScope", function () {
    let scopes = [];
    traverse(ast, {
      Program(path) {
        scopes.push(path.scope);
        path.stop();
      }
    });

    traverse.clearCache.clearScope();

    let scopes2 = [];
    traverse(ast, {
      Program(path) {
        scopes2.push(path.scope);
        path.stop();
      }
    });

    scopes2.forEach(function (p, i) {
      assert.notStrictEqual(p, scopes[i]);
    });
  });
});
