import { types as t } from "@babel/core";

function pathNodeIsPipeExpression(path) {
  return path.node.operator === "|>";
}

const topicReferenceReplacementVisitor = {
  TopicReference(path) {
    path.replaceWith(t.cloneNode(this.topicVariable));
  },
};

function replaceTopicReferencesWithVariables(path, topicVariable) {
  return path.traverse(topicReferenceReplacementVisitor, { topicVariable });
}

function replacePipeExpressionWithAssignment(path, topicVariable) {
  const { left, right } = path.node;

  return path.replaceWith(
    t.sequenceExpression([
      t.assignmentExpression("=", t.cloneNode(topicVariable), left),
      right,
    ]),
  );
}

// This visitor traverses `BinaryExpression`
// and replaces any that use `|>`
// with sequence expressions containing assignment expressions
// with automatically generated variables,
// from inside to outside, from left to right.
export default {
  BinaryExpression: {
    exit(path) {
      const { scope, node } = path;

      if (!pathNodeIsPipeExpression(path)) {
        return;
      }

      const topicVariable = scope.generateUidIdentifierBasedOnNode(node);
      const pipeBodyPath = path.get("right");

      scope.push({ id: topicVariable });
      replaceTopicReferencesWithVariables(pipeBodyPath, topicVariable);
      replacePipeExpressionWithAssignment(path, topicVariable);
    },
  },
};
