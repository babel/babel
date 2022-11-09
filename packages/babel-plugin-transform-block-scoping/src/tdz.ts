import { types as t, type PluginPass } from "@babel/core";
import type { NodePath, Scope, Visitor } from "@babel/traverse";

function getTDZStatus(refPath: NodePath, bindingPath: NodePath) {
  const executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);

  if (executionStatus === "before") {
    return "outside";
  } else if (executionStatus === "after") {
    return "inside";
  } else {
    return "maybe";
  }
}

export const skipTDZChecks = new WeakSet();

function buildTDZAssert(
  status: "maybe" | "inside",
  node: t.Identifier | t.JSXIdentifier,
  state: TDZVisitorState,
) {
  if (status === "maybe") {
    const clone = t.cloneNode(node);
    skipTDZChecks.add(clone);
    return t.callExpression(state.addHelper("temporalRef"), [
      // @ts-expect-error Fixme: we may need to handle JSXIdentifier
      clone,
      t.stringLiteral(node.name),
    ]);
  } else {
    return t.callExpression(state.addHelper("tdz"), [
      t.stringLiteral(node.name),
    ]);
  }
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

type TDZReplacement = { status: "maybe" | "inside"; node: t.Expression };
function getTDZReplacement(
  path: NodePath<t.Identifier | t.JSXIdentifier>,
  state: TDZVisitorState,
): TDZReplacement | undefined;
function getTDZReplacement(
  path: NodePath,
  state: TDZVisitorState,
  id: t.Identifier | t.JSXIdentifier,
): TDZReplacement | undefined;
function getTDZReplacement(
  path: NodePath,
  state: TDZVisitorState,
  id: t.Identifier | t.JSXIdentifier = path.node as any,
): TDZReplacement | undefined {
  if (!isReference(id, path.scope, state)) return;

  if (skipTDZChecks.has(id)) return;
  skipTDZChecks.add(id);

  const bindingPath = path.scope.getBinding(id.name).path;

  if (bindingPath.isFunctionDeclaration()) return;

  const status = getTDZStatus(path, bindingPath);
  if (status === "outside") return;

  if (status === "maybe") {
    // add tdzThis to parent variable declarator so it's exploded
    // @ts-expect-error todo(flow->ts): avoid mutations
    bindingPath.parent._tdzThis = true;
  }

  return { status, node: buildTDZAssert(status, id, state) };
}

export interface TDZVisitorState {
  tdzEnabled: boolean;
  addHelper: PluginPass["addHelper"];
  letReferences: Map<string, t.Identifier>;
}

export const visitor: Visitor<TDZVisitorState> = {
  ReferencedIdentifier(path, state) {
    if (!state.tdzEnabled) return;
    if (path.parentPath.isUpdateExpression()) return;
    // It will be handled after transforming the loop
    if (path.parentPath.isFor({ left: path.node })) return;

    const replacement = getTDZReplacement(path, state);
    if (!replacement) return;

    path.replaceWith(replacement.node);
  },

  UpdateExpression(path, state) {
    if (!state.tdzEnabled) return;

    const { node } = path;
    if (skipTDZChecks.has(node)) return;
    skipTDZChecks.add(node);

    const arg = path.get("argument");
    if (!arg.isIdentifier()) return;

    const replacement = getTDZReplacement(path, state, arg.node);
    if (!replacement) return;

    if (replacement.status === "maybe") {
      path.insertBefore(replacement.node);
    } else {
      path.replaceWith(replacement.node);
    }
  },

  AssignmentExpression(path, state) {
    if (!state.tdzEnabled) return;

    const { node } = path;
    if (skipTDZChecks.has(node)) return;
    skipTDZChecks.add(node);

    const nodes = [];
    const ids = path.getBindingIdentifiers();

    for (const name of Object.keys(ids)) {
      const replacement = getTDZReplacement(path, state, ids[name]);
      if (replacement) {
        nodes.push(t.expressionStatement(replacement.node));
        if (replacement.status === "inside") break;
      }
    }

    if (nodes.length > 0) path.insertBefore(nodes);
  },
};
