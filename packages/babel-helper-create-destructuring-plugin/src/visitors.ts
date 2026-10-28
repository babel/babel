import { types as t } from "@babel/core";
import type { NodePath, PluginPass, Scope, Visitor } from "@babel/core";
import { FEATURES, type ResolvedOptions } from "./features.ts";
import { transformFunctionParams } from "./function-params.ts";
import { Lowering, StepKind, type Step } from "./lowering.ts";
import {
  finishObjectSpreadLoop,
  transformObjectSpread,
} from "./object-spread.ts";
import {
  collectScopeInfo,
  forgetReferences,
  forgetScopeInfo,
  pushHoistedVars,
  registerReplacement,
  trackDeclaredBindings,
} from "./scope.ts";
import {
  hasPrivateClassElement,
  isAnonymousFunctionDefinition,
  isCompletionObservable,
  isValueUsed,
  keepsCompletionValue,
  markTemporary,
  needsLowering,
  referencesName,
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
  /** Evaluate the pending expressions in the initializer of a temporary. */
  const declarePending = () => {
    declarators.push(
      t.variableDeclarator(
        scope.generateUidIdentifier("ref"),
        pending.length === 1 ? pending[0] : t.sequenceExpression(pending),
      ),
    );
  };
  for (const node of nodes) {
    if (t.isExpressionStatement(node)) {
      pending.push(node.expression);
      continue;
    }
    for (const declarator of node.declarations) {
      if (pending.length) {
        if (
          !declarator.init ||
          // `f = (effect, function () {})` would not name the function
          (t.isIdentifier(declarator.id) &&
            isAnonymousFunctionDefinition(declarator.init))
        ) {
          declarePending();
        } else {
          declarator.init = t.sequenceExpression([...pending, declarator.init]);
        }
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
    declarePending();
  }
  return t.variableDeclaration(kind, declarators);
}

function declarationNeedsLowering(
  node: t.VariableDeclaration,
  features: number,
): boolean {
  return node.declarations.some(declarator =>
    needsLowering(declarator.id, features),
  );
}

function transformVariableDeclaration(
  path: NodePath<t.VariableDeclaration>,
  file: PluginPass,
  options: ResolvedOptions,
) {
  const { node, parent, scope } = path;
  // The head of a for-in/of statement is lowered with the statement
  if (t.isForXStatement(parent, { left: node })) return;
  if (node.declare || !declarationNeedsLowering(node, options.features)) {
    return;
  }
  const { declarations } = node;

  const lowering = new Lowering({
    scope,
    options,
    addHelper: name => file.addHelper(name),
    isAssignment: false,
  });

  const forget = collectScopeInfo(path);
  const removeUndeclared = options.pureGetters
    ? trackDeclaredBindings(node, scope)
    : null;
  declarations.forEach((declarator, i) =>
    lowering.lowerDeclarator(declarator, i === declarations.length - 1),
  );

  pushHoistedVars(scope, lowering.hoisted);

  const nodes = materializeDeclaration(lowering.steps, node);

  forget();
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
  removeUndeclared?.();
}

function transformAssignmentExpression(
  path: NodePath<t.AssignmentExpression>,
  file: PluginPass,
  options: ResolvedOptions,
) {
  const { node, scope, parentPath } = path;
  if (node.operator !== "=" || !t.isPattern(node.left)) return;
  if (!needsLowering(node.left, options.features)) return;
  const valueUsed = isValueUsed(path);
  const isArrowBody = parentPath.isArrowFunctionExpression();

  const lowering = new Lowering({
    scope,
    options,
    addHelper: name => file.addHelper(name),
    isAssignment: true,
    inlineTemps: !isArrowBody,
  });
  const forget = collectScopeInfo(path);
  const completion = lowering.lower(node.left, node.right, valueUsed);
  const { steps, hoisted } = lowering;

  forget();

  if (isArrowBody) {
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
    // Declared in `hoisted`
    return t.assignmentExpression("=", t.cloneNode(step.id), step.init);
  });
  if (completion) expressions.push(completion);
  pushHoistedVars(scope, hoisted);
  if (expressions.length === 0 && parentPath.isExpressionStatement()) {
    // e.g. `({} = {});`
    parentPath.remove();
    return;
  }
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
  _: PluginPass,
  options: ResolvedOptions,
) {
  const { node, scope } = path;
  const { left } = node;
  const isDeclaration = t.isVariableDeclaration(left);
  const pattern = isDeclaration ? left.declarations[0].id : left;
  if (
    !(t.isObjectPattern(pattern) || t.isArrayPattern(pattern)) ||
    !needsLowering(pattern, options.features)
  ) {
    return;
  }

  // for (const { a } of b) body;
  // for ({ a } of b) body;
  // transform to:
  // for (const _ref of b) { const { a } = _ref; body; }
  // for (var _ref of b) { ({ a } = _ref); body; }
  // The scope of the loop is crawled again: forget the information of its
  // nodes first, as some of them get new paths.
  forgetScopeInfo(path);
  const ref = scope.generateUidIdentifier("ref");
  // Only assigned by the loop head, before each iteration
  markTemporary(scope, ref.name);
  node.left = t.variableDeclaration(isDeclaration ? left.kind : "var", [
    t.variableDeclarator(ref),
  ]);

  const statements: t.Statement[] = [];
  if (isDeclaration) {
    statements.push(
      t.variableDeclaration(left.kind, [
        t.variableDeclarator(pattern, t.cloneNode(ref)),
      ]),
    );
  } else {
    const assignment = t.assignmentExpression("=", pattern, t.cloneNode(ref));
    path.ensureBlock();
    statements.push(
      // The completion value of the loop is the one of the last iteration
      // whose body did not complete empty: when the body (e.g. `;`, `var x;`,
      // `continue;`) keeps the value of the assignment, assign the pattern in
      // a declaration, which completes empty. `var _ref = ({ a } = _ref)`
      // keeps the value of `_ref`, only assigned by the loop head.
      isCompletionObservable(path) &&
        keepsCompletionValue((node.body as t.BlockStatement).body)
        ? t.variableDeclaration("var", [
            t.variableDeclarator(t.cloneNode(ref), assignment),
          ])
        : t.expressionStatement(assignment),
    );
  }
  unshiftForXStatementBody(path, statements);
  // The pattern will be handled by the VariableDeclaration or
  // AssignmentExpression visitor.
  scope.crawl();
}

/**
 * Whether the body of a catch clause declares a name referenced by the
 * default values or computed keys of its parameter, which can't see the
 * declarations of the body.
 */
function bodyShadowsPatternReference(
  param: t.CatchClause["param"] & {},
  scope: Scope,
): boolean {
  // The body shares the scope of the catch clause
  const paramNames = t.getBindingIdentifiers(param);
  return referencesName(
    param,
    new Set(Object.keys(scope.bindings).filter(name => !paramNames[name])),
  );
}

function transformCatchClause(
  path: NodePath<t.CatchClause>,
  _: PluginPass,
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
  const declaration = t.variableDeclaration("let", [
    t.variableDeclarator(param, t.cloneNode(ref)),
  ]);
  if (bodyShadowsPatternReference(param, scope)) {
    // catch ({ a = b }) { let b; }
    // transforms to:
    // catch (_ref) { let { a = b } = _ref; { let b; } }
    // The nodes of the body get new paths, registered by the crawl below.
    forgetScopeInfo(path.get("body"));
    node.body = t.blockStatement([declaration, node.body]);
  } else {
    node.body.body.unshift(declaration);
  }
  // The pattern will be handled by the VariableDeclaration visitor, which
  // forgets the scope information registered again by this crawl.
  scope.crawl();
}

function transformExportNamedDeclaration(
  path: NodePath<t.ExportNamedDeclaration>,
  _: PluginPass,
  options: ResolvedOptions,
) {
  const declaration = path.get("declaration");
  if (
    !declaration.isVariableDeclaration() ||
    !declarationNeedsLowering(declaration.node, options.features)
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
  const nodes = new Set([node]);
  for (const name of names) {
    const binding = scope.getBinding(name);
    if (binding) forgetReferences(binding, nodes);
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
  const visitor: Visitor<PluginPass> = {
    ExportNamedDeclaration: guard(transformExportNamedDeclaration),
    ForXStatement: guard(transformForXStatement),
    CatchClause: guard(transformCatchClause),
    AssignmentExpression: guard(transformAssignmentExpression),
    VariableDeclaration: guard(transformVariableDeclaration),
    Function: guard(transformFunctionParams),
    ObjectExpression: guard(transformObjectSpread),
    Loop: { exit: guard(finishObjectSpreadLoop) },
  };

  // Private names in patterns must be lowered to private member
  // expressions before the class features plugins transform the class,
  // which happens when visiting the Class node.
  return {
    ...visitor,
    Class: guard<t.Class>((path, state, options) => {
      if (!(options.features & FEATURES.privateDestructuring)) return;
      if (!hasPrivateClassElement(path.node.body)) return;
      path.traverse(visitor, state);
    }),
  };
}
