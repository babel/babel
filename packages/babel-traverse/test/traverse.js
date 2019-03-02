import cloneDeep from "lodash/cloneDeep";
import traverse from "../lib";
import { parse } from "@babel/parser";

describe("traverse", function() {
  const code = `
    var foo = "bar";
    this.test = "wow";
  `;
  const ast = parse(code);
  const program = ast.program;
  const body = program.body;

  it("traverse replace", function() {
    const replacement = {
      type: "StringLiteral",
      value: "foo",
    };
    const ast2 = cloneDeep(program);

    traverse(ast2, {
      enter: function(path) {
        if (path.node.type === "ThisExpression") path.replaceWith(replacement);
      },
    });

    expect(ast2.body[1].expression.left.object).toBe(replacement);
  });

  it("traverse order", function() {
    let acc = "";
    const ast2 = parse(`
      "string literal";
    `);
    traverse(ast2.program, {
      blacklist: ["DirectiveLiteral"],
      enter: function() {
        acc += "1";
      },
      exit: function() {
        acc += "4";
      },
      Directive: {
        enter: function() {
          acc += "2";
        },
        exit: function() {
          acc += "3";
        },
      },
    });

    expect(acc).toBe("1234");
  });

  it("traverse", function() {
    const expected = [
      body[0],
      body[0].declarations[0],
      body[0].declarations[0].id,
      body[0].declarations[0].init,
      body[1],
      body[1].expression,
      body[1].expression.left,
      body[1].expression.left.object,
      body[1].expression.left.property,
      body[1].expression.right,
    ];

    const actual = [];

    traverse(program, {
      enter: function(path) {
        actual.push(path.node);
      },
    });

    expect(actual).toEqual(expected);
  });

  it("traverse falsy parent", function() {
    traverse(null, {
      enter: function() {
        throw new Error("should not be ran");
      },
    });
  });

  it("traverse blacklistTypes", function() {
    const expected = [
      body[0],
      body[0].declarations[0],
      body[0].declarations[0].id,
      body[0].declarations[0].init,
      body[1],
      body[1].expression,
      body[1].expression.right,
    ];

    const actual = [];

    traverse(program, {
      blacklist: ["MemberExpression"],
      enter: function(path) {
        actual.push(path.node);
      },
    });

    expect(actual).toEqual(expected);
  });

  it("hasType", function() {
    expect(traverse.hasType(ast, "ThisExpression")).toBeTruthy();
    expect(
      traverse.hasType(ast, "ThisExpression", ["AssignmentExpression"]),
    ).toBeFalsy();

    expect(traverse.hasType(ast, "ThisExpression")).toBeTruthy();
    expect(traverse.hasType(ast, "Program")).toBeTruthy();

    expect(
      traverse.hasType(ast, "ThisExpression", ["MemberExpression"]),
    ).toBeFalsy();
    expect(traverse.hasType(ast, "ThisExpression", ["Program"])).toBeFalsy();

    expect(traverse.hasType(ast, "ArrowFunctionExpression")).toBeFalsy();
  });

  it("clearCache", function() {
    const paths = [];
    const scopes = [];
    traverse(ast, {
      enter(path) {
        scopes.push(path.scope);
        paths.push(path);
        path.stop();
      },
    });

    traverse.cache.clear();

    const paths2 = [];
    const scopes2 = [];
    traverse(ast, {
      enter(path) {
        scopes2.push(path.scope);
        paths2.push(path);
        path.stop();
      },
    });

    scopes2.forEach(function(_, i) {
      expect(scopes[i]).not.toBe(scopes2[i]);
      expect(paths[i]).not.toBe(paths2[i]);
    });
  });

  it("clearPath", function() {
    const paths = [];
    traverse(ast, {
      enter(path) {
        paths.push(path);
      },
    });

    traverse.cache.clearPath();

    const paths2 = [];
    traverse(ast, {
      enter(path) {
        paths2.push(path);
      },
    });

    paths2.forEach(function(p, i) {
      expect(p).not.toBe(paths[i]);
    });
  });

  it("clearScope", function() {
    const scopes = [];
    traverse(ast, {
      enter(path) {
        scopes.push(path.scope);
        path.stop();
      },
    });

    traverse.cache.clearScope();

    const scopes2 = [];
    traverse(ast, {
      enter(path) {
        scopes2.push(path.scope);
        path.stop();
      },
    });

    scopes2.forEach(function(p, i) {
      expect(p).not.toBe(scopes[i]);
    });
  });
});
