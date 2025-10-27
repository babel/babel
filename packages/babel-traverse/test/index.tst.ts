import { expect, it, describe } from "tstyche";
import traverse, { type NodePath } from "../src/index.ts";
import type * as t from "@babel/types";

describe("traverse", () => {
  it("is allows null", () => {
    traverse({} as any, {
      VariableDeclarator(path) {
        const init = path.get("init");
        expect(init).type.toBeAssignableTo<NodePath<t.Expression | null>>();
        if (init.isIdentifier()) {
          expect(init).type.toBe<NodePath<t.Identifier>>();
        }
      },
    });
  });
  it("assert", () => {
    traverse({} as any, {
      Expression(path: NodePath<t.Expression>) {
        // @ts-expect-error Assertions require every name in the call target to be declared with an explicit type annotation.
        path.assertIdentifier();
        expect(path).type.toBe<NodePath<t.Identifier>>();
      },
    });
  });
});
