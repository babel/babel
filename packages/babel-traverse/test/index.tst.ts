import { expect, it, describe } from "tstyche";
import type { NodePath, Visitor, TraverseOptions } from "../src/index.ts";
import { default as traverse, visitors } from "../src/index.ts";
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
        NodePath<
          | t.VariableDeclaration
          | t.FunctionDeclaration
          | t.ClassDeclaration
          | t.StructDeclaration
          | t.TSDeclareFunction
          | t.TSEnumDeclaration
          | t.TSImportEqualsDeclaration
          | t.TSInterfaceDeclaration
          | t.TSModuleDeclaration
          | t.TSTypeAliasDeclaration
          | t.EnumDeclaration
          | t.InterfaceDeclaration
          | t.OpaqueType
          | t.TypeAlias
          | t.Expression
          | null
        >
      >();
    });

    it("TaggedTemplateExpression.tag.object", () => {
      const path = {} as NodePath<t.TaggedTemplateExpression>;
      const object = path.get("tag.object");
      expect(object).type.toBe<NodePath<t.Expression | t.Super | null>>();
    });

    it("AssignmentExpression.left.object", () => {
      const path = {} as NodePath<t.AssignmentExpression>;
      const object = path.get("left.object");
      expect(object).type.toBe<NodePath<t.Expression | t.Super | null>>();
    });

    it("ClassDeclaration.body.body", () => {
      const path = {} as NodePath<t.ClassDeclaration>;
      const body = path.get("body.body");
      expect(body).type.toBe<
        NodePath<
          | t.ClassMethod
          | t.ClassPrivateMethod
          | t.ClassProperty
          | t.ClassPrivateProperty
          | t.ClassAccessorProperty
          | t.TSDeclareMethod
          | t.TSIndexSignature
          | t.StaticBlock
        >[]
      >();
    });

    it("should support template literal expressions - number", () => {
      const path = {} as NodePath<t.BlockStatement>;
      const index: number = 0;
      const statement = path.get(`body.${index}`);
      const statement2 = path.get(`body.0`);
      expect(statement).type.toBe(statement2);
    });

    it("should support template literal expressions - string", () => {
      const path = {} as NodePath<t.ClassDeclaration>;
      const bodyKey: string = "body";
      const body = path.get(`body.${bodyKey}`);
      expect(body).type.toBe<NodePath<t.Node | null>>();
    });

    it("should support const string type", () => {
      const path = {} as NodePath<t.ClassDeclaration>;
      const key = "body" as const;
      const statement = path.get(`body.${key}`);
      const statement2 = path.get(`body.body`);
      expect(statement).type.toBe(statement2);
    });

    it("falsy path", () => {
      const path = {} as NodePath<t.ClassDeclaration>;
      const body = path.get(`body.x`);
      expect(body).type.toBe<NodePath<null>>();
    });
  });

  describe("Visitor", () => {
    it("top-level enter and exit", () => {
      traverse({} as t.Node, {
        enter(path) {
          expect(path).type.toBe<NodePath<t.Node>>();
          expect(path.type).type.toBe<t.Node["type"]>();
        },
        exit(path) {
          expect(path).type.toBe<NodePath<t.Node>>();
          expect(path.type).type.toBe<t.Node["type"]>();
        },
        noScope: true,
      });
    });

    describe("Union types", () => {
      it("traverse", () => {
        traverse({} as t.Node, {
          "ImportDeclaration|ExportDeclaration"(path) {
            expect(path).type.toBe<
              NodePath<t.ImportDeclaration | t.ExportDeclaration>
            >();
          },
          noScope: true,
        });
        traverse({} as t.Node, {} as Visitor);
      });

      it("visitors.explode", () => {
        visitors.explode({
          "ImportDeclaration|ExportDeclaration"(path) {
            expect(path).type.toBe<
              NodePath<t.ImportDeclaration | t.ExportDeclaration>
            >();
          },
          noScope: true,
        });
        visitors.explode({
          "ImportDeclaration|ExportDeclaration"(path) {
            expect(path).type.toBe<NodePath<t.Node>>();
          },
          noScope: true,
        } as TraverseOptions & Visitor);
      });

      it("NodePath#traverse", () => {
        (({}) as NodePath<t.Node>).traverse({
          "ImportDeclaration|ExportDeclaration"(path) {
            expect(path).type.toBe<
              NodePath<t.ImportDeclaration | t.ExportDeclaration>
            >();
          },
          noScope: true,
        });
        (({}) as NodePath<t.Node>).traverse({
          "ImportDeclaration|ExportDeclaration"(path) {
            expect(path).type.toBe<NodePath<t.Node>>();
          },
          noScope: true,
        } as TraverseOptions & Visitor);
      });
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

  describe("NodePath#insertBefore", () => {
    it("node", () => {
      const path = {} as NodePath<t.Statement>;
      const paths = path.insertBefore({} as t.Identifier);
      expect(paths).type.toBe<[NodePath<t.Identifier>]>();
    });

    it("tuple of nodes", () => {
      const path = {} as NodePath<t.Statement>;
      const [p1, p2] = path.insertBefore([
        {} as t.Identifier,
        {} as t.NullLiteral,
      ]);
      expect(p1).type.toBe<NodePath<t.Identifier>>();
      expect(p2).type.toBe<NodePath<t.NullLiteral>>();
    });

    it("array of nodes", () => {
      const path = {} as NodePath<t.Statement>;
      const paths = path.insertBefore([] as t.Statement[]);
      expect(paths).type.toBe<NodePath<t.Statement>[]>();
    });

    it("destructuring assignment", () => {
      const path = {} as NodePath<t.Statement>;
      const o = {} as { p?: NodePath<t.Identifier | t.NullLiteral> };
      [o.p] = path.insertBefore({} as t.Identifier);
      expect(o.p).type.toBe<NodePath<t.Identifier>>();
    });
  });

  describe("NodePath#insertAfter", () => {
    it("node", () => {
      const path = {} as NodePath<t.Statement>;
      const paths = path.insertAfter({} as t.Identifier);
      expect(paths).type.toBe<[NodePath<t.Identifier>]>();
    });

    it("tuple of nodes", () => {
      const path = {} as NodePath<t.Statement>;
      const [p1, p2] = path.insertAfter([
        {} as t.Identifier,
        {} as t.NullLiteral,
      ]);
      expect(p1).type.toBe<NodePath<t.Identifier>>();
      expect(p2).type.toBe<NodePath<t.NullLiteral>>();
    });

    it("array of nodes", () => {
      const path = {} as NodePath<t.Statement>;
      const paths = path.insertAfter([] as t.Statement[]);
      expect(paths).type.toBe<NodePath<t.Statement>[]>();
    });
  });

  describe("NodePath#replaceWithMultiple", () => {
    it("tuple of nodes", () => {
      const path = {} as NodePath<t.Statement>;
      const [p1, p2] = path.replaceWithMultiple([
        {} as t.ExpressionStatement,
        {} as t.ReturnStatement,
      ]);
      expect(p1).type.toBe<NodePath<t.ExpressionStatement>>();
      expect(p2).type.toBe<NodePath<t.ReturnStatement>>();
    });

    it("array of nodes", () => {
      const path = {} as NodePath<t.Statement>;
      const paths = path.replaceWithMultiple([] as t.Statement[]);
      expect(paths).type.toBe<NodePath<t.Statement>[]>();
    });
  });

  describe("NodePath#unshiftContainer", () => {
    it("node", () => {
      const path = {} as NodePath<t.BlockStatement>;
      const paths = path.unshiftContainer("body", {} as t.ExpressionStatement);
      expect(paths).type.toBe<[NodePath<t.ExpressionStatement>]>();
    });

    it("tuple of nodes", () => {
      const path = {} as NodePath<t.BlockStatement>;
      const [p1, p2] = path.unshiftContainer("body", [
        {} as t.ExpressionStatement,
        {} as t.ReturnStatement,
      ]);
      expect(p1).type.toBe<NodePath<t.ExpressionStatement>>();
      expect(p2).type.toBe<NodePath<t.ReturnStatement>>();
    });

    it("destructuring assignment", () => {
      const path = {} as NodePath<t.ClassBody>;
      const o = {} as { constructor?: NodePath<t.ClassMethod> };
      [o.constructor] = path.unshiftContainer("body", {} as t.ClassMethod);
      expect(o.constructor).type.toBe<NodePath<t.ClassMethod>>();
    });

    it("rejects nodes that do not fit the container", () => {
      const path = {} as NodePath<t.ClassBody>;
      // @ts-expect-error Argument of type 'ExpressionStatement' is not assignable
      path.unshiftContainer("body", {} as t.ExpressionStatement);
    });
  });

  describe("NodePath#pushContainer", () => {
    it("node", () => {
      const path = {} as NodePath<t.BlockStatement>;
      const paths = path.pushContainer("body", {} as t.ExpressionStatement);
      expect(paths).type.toBe<[NodePath<t.ExpressionStatement>]>();
    });

    it("tuple of nodes", () => {
      const path = {} as NodePath<t.BlockStatement>;
      const [p1, p2] = path.pushContainer("body", [
        {} as t.ExpressionStatement,
        {} as t.ReturnStatement,
      ]);
      expect(p1).type.toBe<NodePath<t.ExpressionStatement>>();
      expect(p2).type.toBe<NodePath<t.ReturnStatement>>();
    });

    it("array of nodes", () => {
      const path = {} as NodePath<t.BlockStatement>;
      const paths = path.pushContainer("body", [] as t.Statement[]);
      expect(paths).type.toBe<NodePath<t.Statement>[]>();
    });

    it("rejects nodes that do not fit the container", () => {
      const path = {} as NodePath<t.ClassBody>;
      // @ts-expect-error Argument of type 'ExpressionStatement' is not assignable
      path.pushContainer("body", {} as t.ExpressionStatement);
    });
  });

  it.todo("NodePath#assert*", () => {
    const path = {} as NodePath<t.Expression>;
    // @ts-expect-error Assertions require every name in the call target to be declared with an explicit type annotation.
    path.assertIdentifier();

    expect(path).type.toBe<NodePath<t.Identifier>>();
  });
});
