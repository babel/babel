import traverse from "../lib";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import * as t from "@babel/types";

describe("path/replacement", function () {
  describe("replaceWith", function () {
    it("replaces declaration in ExportDefaultDeclaration node", function () {
      const ast = parse("export default function() {};", {
        sourceType: "module",
      });
      traverse(ast, {
        FunctionDeclaration(path) {
          path.replaceWith(
            t.arrayExpression([
              t.functionExpression(
                path.node.id,
                path.node.params,
                path.node.body,
                path.node.generator,
                path.node.async,
              ),
            ]),
          );
        },
      });

      expect(ast.program.body[0].declaration.type).toBe("ArrayExpression");
    });

    it("throws error when trying to replace Program with a non-Program node", function () {
      const ast = parse("var x = 3;");
      expect(function () {
        traverse(ast, {
          Program(path) {
            path.replaceWith(t.identifier("a"));
          },
        });
      }).toThrow(
        /You can only replace a Program root node with another Program node/,
      );
    });

    it("throws error when used with an array of nodes", function () {
      const ast = parse("function abc() {}; var test = 17;");
      expect(function () {
        traverse(ast, {
          NumericLiteral(path) {
            path.replaceWith([
              t.identifier("should"),
              t.identifier("never"),
              t.identifier("happen"),
            ]);
          },
        });
      }).toThrow(
        /Don't use `path\.replaceWith\(\)` with an array of nodes, use `path\.replaceWithMultiple\(\)`/,
      );
    });

    it("throws error when used with source string", function () {
      const ast = parse(
        "(function() { var x = 3; var y = 17; var c = x + y; })();",
      );
      expect(function () {
        traverse(ast, {
          BinaryExpression(path) {
            path.replaceWith("17 + 23");
          },
        });
      }).toThrow(
        /Don't use `path\.replaceWith\(\)` with a source string, use `path\.replaceWithSourceString\(\)`/,
      );
    });

    it("throws error when trying to replace removed node", function () {
      const ast = parse("var z = 'abc';");
      expect(function () {
        traverse(ast, {
          StringLiteral(path) {
            path.remove();
            path.replaceWith(t.identifier("p"));
          },
        });
      }).toThrow(/You can't replace this node, we've already removed it/);
    });

    it("throws error when passed a falsy value", function () {
      const ast = parse("var z = 'abc';");
      expect(function () {
        traverse(ast, {
          StringLiteral(path) {
            path.replaceWith();
          },
        });
      }).toThrow(
        /You passed `path\.replaceWith\(\)` a falsy node, use `path\.remove\(\)` instead/,
      );
    });

    it("does not revisit the replaced node if it is the node being replaced", () => {
      const ast = parse(`var x;`);
      let visitCounter = 0;
      traverse(ast, {
        VariableDeclaration(path) {
          visitCounter++;
          if (visitCounter > 1) {
            return true;
          }
          path.replaceWith(path.node);
        },
      });
      expect(visitCounter).toBe(1);
    });

    // https://github.com/babel/babel/issues/12386
    it("updates pathCache with the replaced node", () => {
      const ast = parse(`() => (a?.b)?.c`, {
        createParenthesizedExpressions: true,
      });
      traverse(ast, {
        OptionalMemberExpression(path) {
          path.node.type = "MemberExpression";
          // force `replaceWith` to replace `path.node`
          path.replaceWith(t.cloneNode(path.node));
          path.parentPath.ensureBlock();

          const aQuestionDotBNode = path.node.object.expression;
          // avoid traversing to a?.b
          aQuestionDotBNode.type = "MemberExpression";
        },
        ParenthesizedExpression(path) {
          path.replaceWith(path.node.expression);
        },
      });
      expect(generate(ast).code).toMatchInlineSnapshot(`
        "() => {
          return a.b.c;
        };"
      `);
    });
  });
  describe("replaceWithMultiple", () => {
    it("does not add extra parentheses for a JSXElement with a JSXElement parent", () => {
      const ast = parse(`<div><span><p></p><h></h></span></div>`, {
        plugins: ["jsx"],
      });
      traverse(ast, {
        JSXElement: path => {
          if (path.node.openingElement.name.name === "span") {
            path.replaceWithMultiple(path.node.children.filter(t.isJSXElement));
          }
        },
      });
      expect(generate(ast).code).toBe("<div><p></p><h></h></div>;");
    });
    it("does not revisit one of new nodes if it is the node being replaced and is the head of nodes", () => {
      // packages/babel-plugin-transform-block-scoping/src/index.js relies on this behaviour
      const ast = parse(`var x;`);
      let visitCounter = 0;
      traverse(ast, {
        VariableDeclaration(path) {
          visitCounter++;
          if (visitCounter > 1) {
            return true;
          }
          path.replaceWithMultiple([path.node, t.emptyStatement()]);
        },
      });
      expect(visitCounter).toBe(1);
    });
    it("does not revisit one of new nodes if it is the node being replaced and is the tail of nodes", () => {
      // packages/babel-plugin-transform-block-scoping/src/index.js relies on this behaviour
      const ast = parse(`var x;`);
      let visitCounter = 0;
      traverse(ast, {
        VariableDeclaration(path) {
          visitCounter++;
          if (visitCounter > 1) {
            return true;
          }
          path.replaceWithMultiple([t.emptyStatement(), path.node]);
        },
      });
      expect(visitCounter).toBe(1);
    });
  });
});
