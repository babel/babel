import { template, types as t } from "@babel/core";
import type { File, NodePath, Scope, Visitor } from "@babel/core";
import { visitors } from "@babel/traverse";

const findBareSupers = visitors.environmentVisitor<
  NodePath<t.CallExpression>[]
>({
  Super(path) {
    const { node, parentPath } = path;
    if (parentPath.isCallExpression({ callee: node })) {
      this.push(parentPath);
    }
  },
});

const referenceVisitor: Visitor<{ scope: Scope }> = {
  "TSTypeAnnotation|TypeAnnotation"(path) {
    path.skip();
  },

  ReferencedIdentifier(path, { scope }) {
    if (scope.hasOwnBinding(path.node.name)) {
      scope.rename(path.node.name);
      path.skip();
    }
  },
};

type HandleClassTDZState = {
  classBinding: Scope.Binding | null | undefined;
  file: File;
};

function handleClassTDZ(
  path: NodePath<t.Identifier>,
  state: HandleClassTDZState,
) {
  if (
    state.classBinding &&
    state.classBinding === path.scope.getBinding(path.node.name)
  ) {
    const classNameTDZError = state.file.addHelper("classNameTDZError");
    const throwNode = t.callExpression(classNameTDZError, [
      t.stringLiteral(path.node.name),
    ]);

    path.replaceWith(t.sequenceExpression([throwNode, path.node]));
    path.skip();
  }
}

const classFieldDefinitionEvaluationTDZVisitor: Visitor<HandleClassTDZState> = {
  ReferencedIdentifier: handleClassTDZ as (
    path: NodePath<t.Identifier | t.JSXIdentifier>,
  ) => void,
  "TSTypeAnnotation|TypeAnnotation"(path) {
    path.skip();
  },
};

interface RenamerState {
  scope: Scope;
}

// The variables holding the private names and the class references are
// declared with `let` when the class is evaluated in a loop body, so that
// each iteration has its own variables, like the class itself. Otherwise,
// the functions extracted from a class created in a previous iteration would
// use the private names and the class created in the last iteration.
// Returns the scope of the closest block containing the class in the loop
// body, which is entered each time the class is evaluated. Switch cases, catch
// parameters and the heads of nested loops are not blocks, so it is the block
// containing them. The variables of a class in the head of the loop itself, or
// outside of loops, are declared with `var`.
// `reevaluated` is true when the class can be evaluated more than once each
// time the block is entered: in the parts of nested loop heads that are
// evaluated in each of their iterations. Their variables are assigned each
// time, but are still shared by the iterations of the nested loop.
export function getLoopBodyScope(
  path: NodePath<t.Class>,
): { scope: Scope; reevaluated: boolean } | undefined {
  let block: NodePath | undefined;
  let reevaluated = false;
  // Whether the class is in the key of `child`
  let inMemberKey = false;
  for (
    let child: NodePath = path, parent: NodePath | null = path.parentPath;
    parent;
    child = parent, parent = parent.parentPath
  ) {
    if (parent.isLoop()) {
      if (child.key === "body") {
        // Without a block body, Scope#push adds one to the loop
        return { scope: (block ?? parent).scope, reevaluated };
      }
      if (
        !(parent.isForStatement() && child.key === "init") &&
        !(parent.isForXStatement() && child.key === "right")
      ) {
        reevaluated = true;
      }
    }
    if (
      // The computed keys of methods and class members are evaluated in the
      // enclosing scope
      (parent.isFunction() && child.key !== "key") ||
      parent.isProgram() ||
      parent.isStaticBlock() ||
      (parent.isClassBody() && !inMemberKey)
    ) {
      return undefined;
    }
    inMemberKey = child.key === "key";
    if (!block && parent.isBlockStatement()) block = parent;
  }
  return undefined;
}

export function injectInitialization(
  path: NodePath<t.Class>,
  constructor: NodePath<t.ClassMethod> | undefined,
  nodes: t.ExpressionStatement[],
  renamer?: (visitor: Visitor<RenamerState>, state: RenamerState) => void,
  lastReturnsThis?: boolean,
) {
  if (!nodes.length) return;

  const isDerived = !!path.node.superClass;

  if (!constructor) {
    const newConstructor = t.classMethod(
      "constructor",
      t.identifier("constructor"),
      [],
      t.blockStatement([]),
    );

    if (isDerived) {
      newConstructor.params = [t.restElement(t.identifier("args"))];
      newConstructor.body.body.push(template.statement.ast`super(...args)`);
    }

    [constructor] = path.get("body").unshiftContainer("body", newConstructor);
  }

  if (renamer) {
    renamer(referenceVisitor, { scope: constructor.scope });
  }

  if (isDerived) {
    const bareSupers: NodePath<t.CallExpression>[] = [];
    constructor.traverse(findBareSupers, bareSupers);
    let isFirst = true;
    for (const bareSuper of bareSupers) {
      if (isFirst) {
        isFirst = false;
      } else {
        nodes = nodes.map(n => t.cloneNode(n));
      }
      if (!bareSuper.parentPath.isExpressionStatement()) {
        const allNodes: t.Expression[] = [
          bareSuper.node,
          ...nodes.map(n => t.toExpression(n)),
        ];
        if (!lastReturnsThis) allNodes.push(t.thisExpression());
        bareSuper.replaceWith(t.sequenceExpression(allNodes));
      } else {
        bareSuper.insertAfter(nodes);
      }
    }
  } else {
    constructor.get("body").unshiftContainer("body", nodes);
  }
}

type ComputedKeyAssignmentExpression = t.AssignmentExpression & {
  left: t.Identifier;
};

/**
 * Try to memoise a computed key.
 * It returns undefined when the computed key is an uid reference, otherwise
 * an assignment expression `memoiserId = computed key`
 * @export
 * @param {t.Expression} keyNode Computed key
 * @param {Scope} scope The scope where memoiser id should be registered
 * @param {string} hint The memoiser id hint
 * @returns {(ComputedKeyAssignmentExpression | undefined)}
 */
export function memoiseComputedKey(
  keyNode: t.Expression,
  scope: Scope,
  hint: string,
): ComputedKeyAssignmentExpression | undefined {
  const isUidReference = t.isIdentifier(keyNode) && scope.hasUid(keyNode.name);
  if (isUidReference) {
    return;
  }
  const isMemoiseAssignment =
    t.isAssignmentExpression(keyNode, { operator: "=" }) &&
    t.isIdentifier(keyNode.left) &&
    scope.hasUid(keyNode.left.name);
  if (isMemoiseAssignment) {
    return t.cloneNode(keyNode as ComputedKeyAssignmentExpression);
  } else {
    const ident = t.identifier(hint);
    // Declaring in the same block scope
    // Ref: https://github.com/babel/babel/pull/10029/files#diff-fbbdd83e7a9c998721c1484529c2ce92
    scope.push({
      id: ident,
      kind: "let",
    });
    return t.assignmentExpression(
      "=",
      t.cloneNode(ident),
      keyNode,
    ) as ComputedKeyAssignmentExpression;
  }
}

export function extractComputedKeys(
  path: NodePath<t.Class>,
  computedPaths: NodePath<t.ClassProperty | t.ClassMethod>[],
  file: File,
) {
  const { scope } = path;
  const declarations: t.ExpressionStatement[] = [];
  const state = {
    classBinding: path.node.id && scope.getBinding(path.node.id.name),
    file,
  };
  for (const computedPath of computedPaths) {
    const computedKey = computedPath.get("key");
    if (computedKey.isReferencedIdentifier()) {
      handleClassTDZ(computedKey, state);
    } else {
      computedKey.traverse(classFieldDefinitionEvaluationTDZVisitor, state);
    }

    const computedNode = computedPath.node;
    // Make sure computed property names are only evaluated once (upon class definition)
    // and in the right order in combination with static properties
    if (!computedKey.isConstantExpression()) {
      const assignment = memoiseComputedKey(
        computedKey.node,
        scope,
        scope.generateUidBasedOnNode(computedKey.node),
      );
      if (assignment) {
        declarations.push(t.expressionStatement(assignment));
        computedNode.key = t.cloneNode(assignment.left);
      }
    }
  }

  return declarations;
}
