import { types as t } from "@babel/core";
import type { NodePath, PluginPass, Scope, Visitor } from "@babel/core";
import type { ResolvedOptions } from "./features.ts";
import { Lowering, StepKind, type Step } from "./lowering.ts";
import {
  collectScopeInfo,
  forgetReference,
  forgetScopeInfo,
  pushHoistedVars,
  registerReplacement,
  removeUndeclaredBindings,
  snapshotDeclaredBindings,
} from "./scope.ts";
import {
  isValueUsed,
  needsLowering,
  unshiftForXStatementBody,
} from "./util.ts";

/** The expression evaluating a step that is not a temporary declaration. */
function stepToExpression(
  step: Exclude<Step, { kind: StepKind.Temp }>,
): t.Expression {
  return step.kind === StepKind.Bind
    ? t.assignmentExpression("=", step.target, step.init!)
    : step.expression;
}

/**
 * The statements replacing a destructuring assignment statement, located
 * where it was.
 */
function buildAssignmentStatements(
  steps: Step[],
  loc: t.SourceLocation | null | undefined,
): t.Statement[] {
  return steps.map(step => {
    const statement =
      step.kind === StepKind.Temp
        ? t.variableDeclaration("var", [
            t.variableDeclarator(step.id, step.init),
          ])
        : t.expressionStatement(stepToExpression(step));
    statement.loc = loc;
    return statement;
  });
}

function materializeDeclaration(
  steps: Step[],
  original: t.VariableDeclaration,
): (t.VariableDeclaration | t.ExpressionStatement)[] {
  const { kind } = original;
  const out: (t.VariableDeclaration | t.ExpressionStatement)[] = [];
  let current: t.VariableDeclaration | null = null;

  const pushDeclarator = (declarator: t.VariableDeclarator) => {
    if (!current) {
      current = t.variableDeclaration(kind, []);
      out.push(current);
    }
    current.declarations.push(declarator);
  };

  for (const step of steps) {
    switch (step.kind) {
      case StepKind.Temp:
        pushDeclarator(t.variableDeclarator(step.id, step.init));
        break;
      case StepKind.Bind: {
        let declarator;
        if (step.inherits?.id === step.target) {
          // An untouched declarator: reuse it.
          declarator = step.inherits;
          declarator.init = step.init;
        } else {
          declarator = t.variableDeclarator(
            step.target as t.VariableDeclarator["id"],
            step.init,
          );
          if (step.inherits) t.inherits(declarator, step.inherits);
        }
        pushDeclarator(declarator);
        break;
      }
      case StepKind.Effect:
        current = null;
        out.push(t.expressionStatement(step.expression));
        break;
    }
  }

  for (const node of out) {
    // @ts-expect-error internal property
    node._blockHoist = original._blockHoist;
    // Propagate the original declaration node's location
    if (!node.loc) node.loc = original.loc;
  }

  return out;
}

/**
 * The `init` of a `for (;;)` statement can only hold a single node, so fold
 * side effects into the declarators.
 */
function foldForInit(
  nodes: (t.VariableDeclaration | t.ExpressionStatement)[],
  kind: t.VariableDeclaration["kind"],
  scope: Scope,
): t.VariableDeclaration | t.Expression {
  if (nodes.length === 1) {
    const node = nodes[0];
    return t.isExpressionStatement(node) ? node.expression : node;
  }
  const declarators: t.VariableDeclarator[] = [];
  let pending: t.Expression[] = [];
  for (const node of nodes) {
    if (t.isExpressionStatement(node)) {
      pending.push(node.expression);
      continue;
    }
    for (const declarator of node.declarations) {
      if (pending.length) {
        declarator.init = t.sequenceExpression([
          ...pending,
          declarator.init ?? t.buildUndefinedNode(),
        ]);
        pending = [];
      }
      declarators.push(declarator);
    }
  }
  if (pending.length) {
    if (declarators.length === 0) {
      // There are several nodes, which are all expressions
      return t.sequenceExpression(pending);
    }
    declarators.push(
      t.variableDeclarator(
        scope.generateUidIdentifier("ref"),
        pending.length === 1 ? pending[0] : t.sequenceExpression(pending),
      ),
    );
  }
  return t.variableDeclaration(kind, declarators);
}

function transformVariableDeclaration(
  path: NodePath<t.VariableDeclaration>,
  file: PluginPass,
  options: ResolvedOptions,
) {
  const { node, parent, scope } = path;
  const { declarations } = node;

  const lowering = new Lowering({
    scope,
    options,
    addHelper: name => file.addHelper(name),
    isAssignment: false,
  });

  const forgetScopeInfo = collectScopeInfo(path);
  const declared = snapshotDeclaredBindings(node, scope);
  declarations.forEach((declarator, i) =>
    lowering.lowerDeclarator(declarator, i === declarations.length - 1),
  );

  pushHoistedVars(scope, lowering.hoisted);

  const nodes = materializeDeclaration(lowering.steps, node);

  forgetScopeInfo();
  let paths: NodePath[];
  if (nodes.length === 0) {
    // e.g. `var {} = {};`
    path.remove();
    return;
  } else if (t.isForStatement(parent, { init: node })) {
    paths = path.replaceWith(foldForInit(nodes, node.kind, scope));
  } else if (nodes.length === 1) {
    paths = path.replaceWith(nodes[0]);
  } else {
    paths = path.replaceWithMultiple(nodes);
  }
  registerReplacement(paths, scope);
  removeUndeclaredBindings(declared);
}

function transformAssignmentExpression(
  path: NodePath<t.AssignmentExpression>,
  file: PluginPass,
  options: ResolvedOptions,
) {
  const { node, scope, parentPath } = path;
  const valueUsed = isValueUsed(path);

  const lowering = new Lowering({
    scope,
    options,
    addHelper: name => file.addHelper(name),
    isAssignment: true,
  });
  const forgetScopeInfo = collectScopeInfo(path);
  const completion = lowering.lower(node.left, node.right, valueUsed);
  const { steps, hoisted } = lowering;

  forgetScopeInfo();

  if (parentPath.isExpressionStatement()) {
    pushHoistedVars(scope, hoisted);
    const statements = buildAssignmentStatements(steps, parentPath.node.loc);
    if (completion) {
      const statement = t.expressionStatement(completion);
      statement.loc = parentPath.node.loc;
      statements.push(statement);
    }
    const paths = parentPath.replaceWithMultiple(statements);
    registerReplacement(paths, scope);
    // `path` is now detached: don't let other visitors see it.
    path.skip();
    return;
  }

  if (parentPath.isArrowFunctionExpression()) {
    // () => [a, b] = c;   ->   () => { ...; return _ref; }
    const statements = buildAssignmentStatements(steps, node.loc);
    const returnStatement = t.returnStatement(completion);
    returnStatement.loc = node.loc;
    statements.push(returnStatement);
    const [bodyPath] = parentPath
      .get("body")
      .replaceWith(t.blockStatement(statements));
    pushHoistedVars(parentPath.scope, hoisted);
    registerReplacement(bodyPath.get("body"), parentPath.scope);
    // Unlike in the other cases, `path` is now the path of the new body
    // (the same container key): don't skip it, so that other plugins see it.
    return;
  }

  const expressions = steps.map(step => {
    if (step.kind !== StepKind.Temp) return stepToExpression(step);
    hoisted.push(step.id);
    return t.assignmentExpression("=", t.cloneNode(step.id), step.init);
  });
  if (completion) expressions.push(completion);
  pushHoistedVars(scope, hoisted);
  const expression =
    expressions.length === 0
      ? // e.g. `({} = {}, x)`: nothing is evaluated and the value is unused.
        t.buildUndefinedNode()
      : expressions.length === 1
        ? expressions[0]
        : t.sequenceExpression(expressions);
  expression.loc = node.loc;
  registerReplacement(path.replaceWith(expression), scope);
}

function transformForXStatement(
  path: NodePath<t.ForXStatement>,
  options: ResolvedOptions,
) {
  const { node, scope } = path;
  const { left } = node;
  const { features } = options;

  if (t.isVariableDeclaration(left)) {
    const pattern = left.declarations[0].id;
    if (!needsLowering(pattern, features)) return;

    // for (const { a } of b) body;
    // transforms to:
    // for (const _ref of b) { const { a } = _ref; body; }
    // The scope of the loop is crawled again: forget the information of its
    // nodes first, as some of them get new paths.
    forgetScopeInfo(path);
    const key = scope.generateUidIdentifier("ref");
    node.left = t.variableDeclaration(left.kind, [
      t.variableDeclarator(key, null),
    ]);
    unshiftForXStatementBody(path, [
      t.variableDeclaration(left.kind, [
        t.variableDeclarator(pattern, t.cloneNode(key)),
      ]),
    ]);
    // the pattern will be handled by the VariableDeclaration visitor.
    scope.crawl();
  } else if (t.isPattern(left)) {
    if (!needsLowering(left, features)) return;

    // for ({ a } of b) body;
    // transforms to:
    // for (var _ref of b) { ({ a } = _ref); body; }
    forgetScopeInfo(path);
    const temp = scope.generateUidIdentifier("ref");
    node.left = t.variableDeclaration("var", [t.variableDeclarator(temp)]);

    path.ensureBlock();
    const nodes: t.Statement[] = [
      t.expressionStatement(
        t.assignmentExpression("=", left, t.cloneNode(temp)),
      ),
    ];
    // todo: the completion of a for statement can only be observed from
    // a do block (or eval that we don't support),
    // but the new do-expression proposal plans to ban iteration ends in the
    // do block, maybe we can get rid of this
    if (
      (node.body as t.BlockStatement).body.length === 0 &&
      path.isCompletionRecord()
    ) {
      nodes.push(t.expressionStatement(t.buildUndefinedNode()));
    }
    unshiftForXStatementBody(path, nodes);
    // the pattern will be handled by the AssignmentExpression visitor.
    scope.crawl();
  }
}

function transformCatchClause(
  path: NodePath<t.CatchClause>,
  options: ResolvedOptions,
) {
  const { node, scope } = path;
  const { param } = node;
  if (!param || !needsLowering(param, options.features)) return;

  // catch ({ a }) { body }
  // transforms to:
  // catch (_ref) { let { a } = _ref; body }
  const ref = scope.generateUidIdentifier("ref");
  node.param = ref;
  node.body.body.unshift(
    t.variableDeclaration("let", [
      t.variableDeclarator(param, t.cloneNode(ref)),
    ]),
  );
  // The pattern will be handled by the VariableDeclaration visitor, which
  // forgets the scope information registered again by this crawl.
  scope.crawl();
}

function transformExportNamedDeclaration(
  path: NodePath<t.ExportNamedDeclaration>,
  options: ResolvedOptions,
) {
  const declaration = path.get("declaration");
  if (!declaration.isVariableDeclaration()) return;
  if (
    !declaration.node.declarations.some(declarator =>
      needsLowering(declarator.id, options.features),
    )
  ) {
    return;
  }

  // Split the declaration and export list into two declarations so that the variable
  // declaration can be split up later without needing to worry about not being a
  // top-level statement.
  // The export declaration is registered as a reference of the exported
  // bindings, and its path is reused for the variable declaration: the
  // specifiers of the new export declaration are the references now.
  const { node, scope } = path;
  const names = Object.keys(declaration.getOuterBindingIdentifiers());
  for (const name of names) {
    const binding = scope.getBinding(name);
    if (binding) forgetReference(binding, node);
  }
  path.splitExportDeclaration();
  registerReplacement([path.getNextSibling() as NodePath], scope);
}

/**
 * Wraps a handler so that it only runs for the plugin instance using the
 * newest version of this package, with the merged options of all the
 * destructuring plugins.
 */
export type Guard = <T extends t.Node>(
  handler: (
    path: NodePath<T>,
    state: PluginPass,
    options: ResolvedOptions,
  ) => void,
) => (path: NodePath<T>, state: PluginPass) => void;

export function buildDestructuringVisitor(guard: Guard): Visitor<PluginPass> {
  return {
    ExportNamedDeclaration: guard<t.ExportNamedDeclaration>(
      (path, _, options) => transformExportNamedDeclaration(path, options),
    ),

    ForXStatement: guard<t.ForXStatement>((path, _, options) =>
      transformForXStatement(path, options),
    ),

    CatchClause: guard<t.CatchClause>((path, _, options) =>
      transformCatchClause(path, options),
    ),

    AssignmentExpression: guard<t.AssignmentExpression>(
      (path, state, options) => {
        const { node } = path;
        if (node.operator !== "=" || !t.isPattern(node.left)) return;
        if (!needsLowering(node.left, options.features)) return;
        transformAssignmentExpression(path, state, options);
      },
    ),

    VariableDeclaration: guard<t.VariableDeclaration>(
      (path, state, options) => {
        const { node, parent } = path;
        if (t.isForXStatement(parent)) return;
        if (!parent || !path.container) return; // i don't know why this is necessary - TODO
        if (node.declare) return;
        if (
          !node.declarations.some(declarator =>
            needsLowering(declarator.id, options.features),
          )
        ) {
          return;
        }
        transformVariableDeclaration(path, state, options);
      },
    ),
  };
}
