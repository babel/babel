import {
  assignmentExpression,
  expressionStatement,
  identifier,
} from "@babel/types";
import type * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";

export type EmitFunction = (
  id: t.Identifier,
  idName: string,
  hasInit: boolean,
) => any;

type State = {
  kind: "var" | "let";
  emit: EmitFunction;
};

type Unpacked<T> = T extends (infer U)[] ? U : T;

const visitor = {
  Scope(path: NodePath, state: State) {
    if (state.kind === "let") path.skip();
  },

  FunctionParent(path: NodePath) {
    path.skip();
  },

  VariableDeclaration(path: NodePath<t.VariableDeclaration>, state: State) {
    if (state.kind && path.node.kind !== state.kind) return;

    const nodes = [];

    const declarations: ReadonlyArray<
      NodePath<Unpacked<t.VariableDeclaration["declarations"]>>
    > = path.get("declarations");
    let firstId;

    for (const declar of declarations) {
      firstId = declar.node.id;

      if (declar.node.init) {
        nodes.push(
          expressionStatement(
            assignmentExpression("=", declar.node.id, declar.node.init),
          ),
        );
      }

      for (const name of Object.keys(declar.getBindingIdentifiers())) {
        state.emit(identifier(name), name, declar.node.init !== null);
      }
    }

    // for (var i in test)
    if (path.parentPath.isFor({ left: path.node })) {
      path.replaceWith(firstId);
    } else {
      path.replaceWithMultiple(nodes);
    }
  },
};

export default function hoistVariables(
  path: NodePath,
  emit: EmitFunction,
  kind: "var" | "let" = "var",
) {
  path.traverse(visitor, { kind, emit });
}
