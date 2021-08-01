import { template, types as t } from "@babel/core";
import { findBareSupers } from "./context";
import {
  buildPrivateMethodDeclaration,
  buildPrivateNamesNodes,
} from "./private";

const referenceVisitor = {
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

export function injectStaticInitialization(
  path,
  nodesBefore,
  nodesAfter,
  getExternalClassRef,
  needsClassRef,
) {
  if (path.isClassDeclaration()) {
    path.insertBefore(nodesBefore);
    path.insertAfter(nodesAfter);
  } else {
    let pushRef = needsClassRef;

    const assignment = t.assignmentExpression(
      "=",
      getExternalClassRef(),
      path.node,
    );
    if (nodesAfter.length > 0) {
      path.replaceWithMultiple([
        ...nodesBefore,
        assignment,
        ...nodesAfter,
        getExternalClassRef(),
      ]);
      pushRef = true;
    } else if (needsClassRef && nodesBefore.length > 0) {
      path.replaceWithMultiple([...nodesBefore, assignment]);
    } else if (needsClassRef) {
      path.replaceWith(assignment);
    } else if (nodesBefore.length > 0) {
      path.insertBefore(nodesBefore);
    }

    if (pushRef) path.scope.push({ id: getExternalClassRef() });
  }
}

export function injectPureStatics({
  state,
  path,
  privateNamesMap,
  instancePrivMethods,
  staticPrivMethods,
  privateFieldsAsProperties,
}) {
  const stmtParent = path.find(
    parent =>
      parent.isStatement() ||
      parent.isDeclaration() ||
      parent.parentPath.isArrowFunctionExpression({
        body: parent.node,
      }),
  );

  const pureStaticNodesBefore = buildPrivateNamesNodes(
    privateNamesMap,
    privateFieldsAsProperties,
    state,
  );
  if (pureStaticNodesBefore) stmtParent.insertBefore(pureStaticNodesBefore);

  const pureStaticNodesAfter = instancePrivMethods
    .concat(staticPrivMethods)
    .map(method =>
      buildPrivateMethodDeclaration(
        method,
        privateNamesMap,
        privateFieldsAsProperties,
      ),
    );
  if (pureStaticNodesAfter.length > 0) {
    stmtParent.insertAfter(pureStaticNodesAfter);
  }
}

function handleClassTDZ(path, state) {
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

const classFieldDefinitionEvaluationTDZVisitor = {
  ReferencedIdentifier: handleClassTDZ,
};

export function extractComputedKeys(path, computedPaths, file) {
  const initialization = [];
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
      const id = path.scope.generateUidIdentifierBasedOnNode(computedNode.key);
      // Declaring in the same block scope
      // Ref: https://github.com/babel/babOVel/pull/10029/files#diff-fbbdd83e7a9c998721c1484529c2ce92
      path.scope.push({ id, kind: "let" });
      initialization.push(
        t.assignmentExpression("=", t.cloneNode(id), computedNode.key),
      );
      computedNode.key = t.cloneNode(id);
    }
  }

  return initialization;
}
