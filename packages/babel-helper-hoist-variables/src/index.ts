import * as t from "@babel/types";
import type { Identifier, VariableDeclaration } from "@babel/types";
import type { NodePath } from "@babel/traverse";

export type EmitFunction = (
  id: Identifier,
  idName: string,
  hasInit: boolean,
) => any;

type State = {
  kind: "var" | "let";
  emit: EmitFunction;
};

const visitor = {
  Scope(path: NodePath, state: State) {
    if (state.kind === "let") path.skip();
  },

  Function(path: NodePath) {
    path.skip();
  },

  VariableDeclaration(path: NodePath<VariableDeclaration>, state: State) {
    if (state.kind && path.node.kind !== state.kind) return;

    const nodes = [];

    const declarations: ReadonlyArray<NodePath<
      VariableDeclaration["declarations"]
    >> = path.get("declarations");
    let firstId;

    for (const declar of declarations) {
      firstId = declar.node.id;

      if (declar.node.init) {
        nodes.push(
          t.expressionStatement(
            t.assignmentExpression("=", declar.node.id, declar.node.init),
          ),
        );
      }

      for (const name of Object.keys(declar.getBindingIdentifiers())) {
        state.emit(t.identifier(name), name, declar.node.init !== null);
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
