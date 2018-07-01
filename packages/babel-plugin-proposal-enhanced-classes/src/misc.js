import { template, traverse, types as t } from "@babel/core";
import { environmentVisitor } from "@babel/helper-replace-supers";

const findBareSupers = traverse.visitors.merge([
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

const referenceVisitor = {
  "TSTypeAnnotation|TypeAnnotation"(path) {
    path.skip();
  },

  ReferencedIdentifier(path) {
    if (this.scope.hasOwnBinding(path.node.name)) {
      this.scope.rename(path.node.name);
      path.skip();
    }
  },
};

const classFieldDefinitionEvaluationTDZVisitor = traverse.visitors.merge([
  {
    ReferencedIdentifier(path) {
      if (this.classRef === path.scope.getBinding(path.node.name)) {
        const classNameTDZError = this.file.addHelper("classNameTDZError");
        const throwNode = t.callExpression(classNameTDZError, [
          t.stringLiteral(path.node.name),
        ]);

        path.replaceWith(t.sequenceExpression([throwNode, path.node]));
        path.skip();
      }
    },
  },
  environmentVisitor,
]);

export function injectInitialization(path, constructor, nodes, renamer) {
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
    const bareSupers = [];
    constructor.traverse(findBareSupers, bareSupers);
    for (const bareSuper of bareSupers) {
      bareSuper.insertAfter(nodes);
    }
  } else {
    constructor.get("body").unshiftContainer("body", nodes);
  }
}

export function extractComputedKeys(ref, path, computedPaths, file) {
  const declarations = [];

  for (const computedPath of computedPaths) {
    computedPath.traverse(classFieldDefinitionEvaluationTDZVisitor, {
      classRef: path.scope.getBinding(ref.name),
      file,
    });

    const computedNode = computedPath.node;
    // Make sure computed property names are only evaluated once (upon class definition)
    // and in the right order in combination with static properties
    if (!computedPath.get("key").isConstantExpression()) {
      const ident = path.scope.generateUidIdentifierBasedOnNode(
        computedNode.key,
      );
      declarations.push(
        t.variableDeclaration("var", [
          t.variableDeclarator(ident, computedNode.key),
        ]),
      );
      computedNode.key = t.cloneNode(ident);
    }
  }

  return declarations;
}
