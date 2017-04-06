import traverse from "../lib";
import assert from "assert";
import { parse } from "babylon";
import * as t from "babel-types";

describe("path/replacement", function () {
  describe("replaceWith", function () {
    const ast = parse("export default function() {};", { sourceType: "module" });

    it("replaces declaration in ExportDefaultDeclaration node", function() {
      traverse(ast, {
        FunctionDeclaration(path) {
          path.replaceWith(t.arrayExpression([
            t.functionExpression(
              path.node.id,
              path.node.params,
              path.node.body,
              path.node.generator,
              path.node.async
            ),
          ]));
        },
      });

      assert(ast.program.body[0].declaration.type == "ArrayExpression");
    });
  });
});
