import { types as t } from "@babel/core";
import type { Scope, NodePath, PluginPass } from "@babel/core";

export function validateUsage(
  path: NodePath<t.VariableDeclaration>,
  state: PluginPass,
  tdzEnabled: boolean,
) {
  const dynamicTDZNames = [];

  for (const name of Object.keys(path.getBindingIdentifiers())) {
    const binding = path.scope.getBinding(name);
    // binding may be null. ref: https://github.com/babel/babel/issues/15300
    if (!binding) continue;
    if (tdzEnabled) {
      if (injectTDZChecks(binding, state)) dynamicTDZNames.push(name);
    }
    if (path.node.kind === "const") {
      disallowConstantViolations(name, binding, state);
    }
  }

  return dynamicTDZNames;
}

function disallowConstantViolations(
  name: string,
  binding: Scope.Binding,
  state: PluginPass,
) {
  for (const violation of binding.constantViolations) {
    const readOnlyError = state.addHelper("readOnlyError");
    const throwNode = t.callExpression(readOnlyError, [t.stringLiteral(name)]);

    if (violation.isAssignmentExpression()) {
      const { operator, left, right } = violation.node;
      if (operator === "=") {
        const exprs = [right];
        exprs.push(throwNode);
        violation.replaceWith(t.sequenceExpression(exprs));
      } else if (["&&=", "||=", "??="].includes(operator)) {
        violation.replaceWith(
          t.logicalExpression(
            // @ts-expect-error todo: give a better type to operator
            operator.slice(0, -1),
            left,
            t.sequenceExpression([right, throwNode]),
          ),
        );
      } else {
        violation.replaceWith(
          t.sequenceExpression([
            t.binaryExpression(
              // @ts-expect-error todo: give a better type to operator
              operator.slice(0, -1),
              left,
              right,
            ),
            throwNode,
          ]),
        );
      }
    } else if (violation.isUpdateExpression()) {
      violation.replaceWith(
        t.sequenceExpression([
          t.unaryExpression("+", violation.get("argument").node),
          throwNode,
        ]),
      );
    } else if (violation.isForXStatement()) {
      violation.ensureBlock();
      violation
        .get("left")
        .replaceWith(
          t.variableDeclaration("var", [
            t.variableDeclarator(violation.scope.generateUidIdentifier(name)),
          ]),
        );
      (violation.node.body as t.BlockStatement).body.unshift(
        t.expressionStatement(throwNode),
      );
    }
  }
}

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

const skipTDZChecks = new WeakSet();

function buildTDZAssert(
  status: "maybe" | "inside",
  node: t.Identifier | t.JSXIdentifier,
  state: PluginPass,
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

type TDZReplacement = { status: "maybe" | "inside"; node: t.Expression };
function getTDZReplacement(
  path: NodePath<t.Identifier | t.JSXIdentifier>,
  state: PluginPass,
): TDZReplacement | undefined;
function getTDZReplacement(
  path: NodePath,
  state: PluginPass,
  id: t.Identifier | t.JSXIdentifier,
): TDZReplacement | undefined;
function getTDZReplacement(
  path: NodePath,
  state: PluginPass,
  id: t.Identifier | t.JSXIdentifier = path.node as any,
): TDZReplacement | undefined {
  if (skipTDZChecks.has(id)) return;
  skipTDZChecks.add(id);

  const bindingPath = path.scope.getBinding(id.name)?.path;

  if (!bindingPath || bindingPath.isFunctionDeclaration()) return;

  const status = getTDZStatus(path, bindingPath);
  if (status === "outside") return;

  if (status === "maybe") {
    // add tdzThis to parent variable declarator so it's exploded
    // @ts-expect-error todo(flow->ts): avoid mutations
    bindingPath.parent._tdzThis = true;
  }

  return { status, node: buildTDZAssert(status, id, state) };
}

function injectTDZChecks(binding: Scope.Binding, state: PluginPass) {
  const allUsages = new Set(binding.referencePaths);
  binding.constantViolations.forEach(allUsages.add, allUsages);

  let dynamicTdz = false;

  for (const path of binding.constantViolations) {
    const { node } = path;
    if (skipTDZChecks.has(node)) continue;
    skipTDZChecks.add(node);

    if (path.isUpdateExpression()) {
      // arg is an identifier referencing the current binding
      const arg = path.get("argument") as NodePath<t.Identifier>;

      const replacement = getTDZReplacement(path, state, arg.node);
      if (!replacement) continue;

      if (replacement.status === "maybe") {
        dynamicTdz = true;
        path.insertBefore(replacement.node);
      } else {
        path.replaceWith(replacement.node);
      }
    } else if (path.isAssignmentExpression()) {
      const nodes = [];
      const ids = process.env.BABEL_8_BREAKING
        ? path.getAssignmentIdentifiers()
        : path.getBindingIdentifiers();

      for (const name of Object.keys(ids)) {
        const replacement = getTDZReplacement(path, state, ids[name]);
        if (replacement) {
          nodes.push(t.expressionStatement(replacement.node));
          if (replacement.status === "inside") break;
          if (replacement.status === "maybe") dynamicTdz = true;
        }
      }

      if (nodes.length > 0) path.insertBefore(nodes);
    }
  }

  for (const path of binding.referencePaths as NodePath<t.Identifier>[]) {
    if (path.parentPath.isUpdateExpression()) continue;
    // It will be handled after transforming the loop
    if (path.parentPath.isFor({ left: path.node })) continue;

    const replacement = getTDZReplacement(path, state);
    if (!replacement) continue;
    if (replacement.status === "maybe") dynamicTdz = true;

    path.replaceWith(replacement.node);
  }

  return dynamicTdz;
}
