import { expect, it, describe } from "tstyche";
import type { NodePath } from "../src/index.ts";
import type * as t from "@babel/types";

describe("traverse", () => {
  describe("NodePath#get", () => {
    it("TryStatement.handler.body", () => {
      const path = {} as NodePath<t.TryStatement>;
      const body = path.get("handler.body");
      expect(body).type.toBe<NodePath<t.BlockStatement | null>>();
    });

    it("ExportDeclaration.declaration", () => {
      const path = {} as NodePath<t.ExportDeclaration>;
      const declaration = path.get("declaration");
      expect(declaration).type.toBe<
        NodePath<t.Declaration | t.Expression | null>
      >();
    });

    it("TaggedTemplateExpression.tag.object", () => {
      const path = {} as NodePath<t.TaggedTemplateExpression>;
      const object = path.get("tag.object");
      expect(object).type.toBe<NodePath<t.Expression | null>>();
    });

    it("AssignmentExpression.left.object", () => {
      const path = {} as NodePath<t.AssignmentExpression>;
      const object = path.get("left.object");
      expect(object).type.toBe<NodePath<t.Expression | null>>();
    });
  });

  describe("NodePath#is*", () => {
    it("allows null", () => {
      const path = {} as NodePath<t.VariableDeclarator>;
      const init = path.get("init");
      expect(init).type.toBe<NodePath<t.Expression | null>>();
      if (init.isIdentifier()) {
        expect(init).type.toBe<NodePath<t.Identifier>>();
      }
    });

    it("virtual types", () => {
      const path = {} as NodePath<t.Node>;
      if (path.isBindingIdentifier()) {
        expect(path).type.toBe<NodePath<t.Identifier>>();
      }
    });
  });

  it.todo("NodePath#assert*", () => {
    const path = {} as NodePath<t.Expression>;
    // @ts-expect-error Assertions require every name in the call target to be declared with an explicit type annotation.
    path.assertIdentifier();

    expect(path).type.toBe<NodePath<t.Identifier>>();
  });
});
