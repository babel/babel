import { template, traverse, types as t } from "@babel/core";
import type { File } from "@babel/core";
import type { NodePath, Scope, Visitor, Binding } from "@babel/traverse";
import environmentVisitor from "@babel/helper-environment-visitor";

const findBareSupers = traverse.visitors.merge<NodePath<t.CallExpression>[]>([
  {
    Super(path) {
      const { node, parentPath } = path;
      if (parentPath.isCallExpression({ callee: node })) {
        this.push(parentPath);
      }
    },
  },
  environmentVisitor,
]);

const referenceVisitor: Visitor<{ scope: Scope }> = {
  "TSTypeAnnotation|TypeAnnotation"(
    path: NodePath<t.TSTypeAnnotation | t.TypeAnnotation>,
  ) {
    path.skip();
  },

  ReferencedIdentifier(path: NodePath<t.Identifier>, { scope }) {
    if (scope.hasOwnBinding(path.node.name)) {
      scope.rename(path.node.name);
      path.skip();
    }
  },
};

type HandleClassTDZState = {
  classBinding: Binding;
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
  ReferencedIdentifier: handleClassTDZ,
};

interface RenamerState {
  scope: Scope;
}

export function injectInitialization(
  path: NodePath<t.Class>,
  constructor: NodePath<t.ClassMethod> | undefined,
  nodes: t.Statement[],
  renamer?: (visitor: Visitor<RenamerState>, state: RenamerState) => void,
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

    [constructor] = path
      .get("body")
      .unshiftContainer("body", newConstructor) as NodePath<t.ClassMethod>[];
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
        bareSuper.insertAfter(nodes);
        isFirst = false;
      } else {
        bareSuper.insertAfter(nodes.map(n => t.cloneNode(n)));
      }
    }
  } else {
    constructor.get("body").unshiftContainer("body", nodes);
  }
}

export function extractComputedKeys(
  path: NodePath<t.Class>,
  computedPaths: NodePath<t.ClassProperty | t.ClassMethod>[],
  file: File,
) {
  const declarations: t.ExpressionStatement[] = [];
  const state = {
    classBinding: path.node.id && path.scope.getBinding(path.node.id.name),
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
      const ident = path.scope.generateUidIdentifierBasedOnNode(
        computedNode.key,
      );
      // Declaring in the same block scope
      // Ref: https://github.com/babel/babel/pull/10029/files#diff-fbbdd83e7a9c998721c1484529c2ce92
      path.scope.push({
        id: ident,
        kind: "let",
      });
      declarations.push(
        t.expressionStatement(
          t.assignmentExpression("=", t.cloneNode(ident), computedNode.key),
        ),
      );
      computedNode.key = t.cloneNode(ident);
    }
  }

  return declarations;
}
