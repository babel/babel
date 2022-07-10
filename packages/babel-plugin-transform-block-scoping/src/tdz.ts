import { types as t, template, type PluginPass } from "@babel/core";
import type { NodePath, Scope, Visitor } from "@babel/traverse";

function getTDZStatus(
  refPath: NodePath<t.Identifier | t.JSXIdentifier>,
  bindingPath: NodePath,
) {
  const executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);

  if (executionStatus === "before") {
    return "outside";
  } else if (executionStatus === "after") {
    return "inside";
  } else {
    return "maybe";
  }
}

function buildTDZAssert(
  node: t.Identifier | t.JSXIdentifier,
  state: TDZVisitorState,
) {
  return t.callExpression(state.addHelper("temporalRef"), [
    // @ts-expect-error Fixme: we may need to handle JSXIdentifier
    node,
    t.stringLiteral(node.name),
  ]);
}

function isReference(
  node: t.Identifier | t.JSXIdentifier,
  scope: Scope,
  state: TDZVisitorState,
) {
  const declared = state.letReferences.get(node.name);
  if (!declared) return false;

  // declared node is different in this scope
  return scope.getBindingIdentifier(node.name) === declared;
}

const visitedMaybeTDZNodes = new WeakSet();

export interface TDZVisitorState {
  tdzEnabled: boolean;
  addHelper: PluginPass["addHelper"];
  letReferences: Map<string, t.Identifier>;
}

export const visitor: Visitor<TDZVisitorState> = {
  ReferencedIdentifier(path, state) {
    if (!state.tdzEnabled) return;

    const { node, parent, scope } = path;

    if (path.parentPath.isFor({ left: node })) return;
    if (!isReference(node, scope, state)) return;

    const bindingPath = scope.getBinding(node.name).path;

    if (bindingPath.isFunctionDeclaration()) return;

    const status = getTDZStatus(path, bindingPath);
    if (status === "outside") return;

    if (status === "maybe") {
      if (visitedMaybeTDZNodes.has(node)) {
        return;
      }
      visitedMaybeTDZNodes.add(node);
      const assert = buildTDZAssert(node, state);

      // add tdzThis to parent variable declarator so it's exploded
      // @ts-expect-error todo(flow->ts): avoid mutations
      bindingPath.parent._tdzThis = true;

      if (path.parentPath.isUpdateExpression()) {
        // @ts-expect-error todo(flow->ts): avoid node mutations
        if (parent._ignoreBlockScopingTDZ) return;
        path.parentPath.replaceWith(
          t.sequenceExpression([assert, parent as t.UpdateExpression]),
        );
      } else {
        path.replaceWith(assert);
      }
    } else if (status === "inside") {
      path.replaceWith(
        template.ast`${state.addHelper("tdz")}("${node.name}")` as t.Statement,
      );
    }
  },

  AssignmentExpression: {
    exit(path, state) {
      if (!state.tdzEnabled) return;

      const { node } = path;

      // @ts-expect-error todo(flow->ts): avoid node mutations
      if (node._ignoreBlockScopingTDZ) return;

      const nodes = [];
      const ids = path.getBindingIdentifiers();

      for (const name of Object.keys(ids)) {
        const id = ids[name];

        if (isReference(id, path.scope, state)) {
          nodes.push(id);
        }
      }

      if (nodes.length) {
        // @ts-expect-error todo(flow->ts): avoid mutations
        node._ignoreBlockScopingTDZ = true;
        nodes.push(node);
        path.replaceWithMultiple(nodes.map(n => t.expressionStatement(n)));
      }
    },
  },
};
