import type { NodePath, Visitor, types as t } from "@babel/core";
import { traverse } from "@babel/core";
const mergeVisitors = traverse.visitors.merge;

// Wrap all do expressions in an IIFE.
// This doesn't work with control flow statements like break/continue/return.
// Only use this when the code is too hard to transform.
interface ControlFlowVisitorState {
  break: Set<string | null>;
  continue: Set<string | null>;
  returnPath: NodePath<t.ReturnStatement> | null;
}

function throwError(path: NodePath) {
  throw path.buildCodeFrameError(
    "This control flow escape from do expression is not supported.",
  );
}

const controlFlowVisitor: Visitor<ControlFlowVisitorState> = {
  FunctionParent(path) {
    path.skip();
  },
  "SwitchStatement|Loop"(_, state) {
    state.break.add(null);
    state.continue.add(null);
  },
  LabeledStatement(path, state) {
    const name = path.node.label.name;
    state.break.add(name);
  },
  BreakStatement(path, state) {
    if (!state.break.has(path.node.label?.name ?? null)) {
      throwError(path);
    }
  },
  ContinueStatement(path, state) {
    if (!state.continue.has(path.node.label?.name ?? null)) {
      throwError(path);
    }
  },
  ReturnStatement(path, state) {
    state.returnPath = path;
  },
};

export function collectControlFlowStatements(path: NodePath) {
  const state: ControlFlowVisitorState = {
    break: new Set<string | null>(),
    continue: new Set<string | null>(),
    returnPath: null,
  };
  path.traverse(controlFlowVisitor, state);
  return state;
}

export function wrapDoExpressionInIIFE(path: NodePath) {
  const state: ControlFlowVisitorState = {
    break: new Set<string | null>(),
    continue: new Set<string | null>(),
    returnPath: null,
  };
  path.traverse(
    mergeVisitors([
      {
        DoExpression(path) {
          const body = path.node.body.body;
          if (body.length) {
            path.replaceExpressionWithStatements(body);
          } else {
            path.replaceWith(path.scope.buildUndefinedNode());
          }
        },
      },
      controlFlowVisitor,
    ]),
    state,
  );
  if (state.returnPath) {
    throwError(state.returnPath);
  }
}
