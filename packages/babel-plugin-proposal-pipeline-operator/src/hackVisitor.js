import { types as t } from "@babel/core";

const topicReferenceReplacementVisitor = {
  TopicReference(path) {
    path.replaceWith(t.cloneNode(this.topicVariable));
  },
};

// This visitor traverses `BinaryExpression`
// and replaces any that use `|>`
// with sequence expressions containing assignment expressions
// with automatically generated variables,
// from inside to outside, from left to right.
export default {
  BinaryExpression: {
    exit(path) {
      const { scope, node } = path;
      const { left, right } = path.node;

      if (path.node.operator !== "|>") {
        // The path node is not a pipe expression.
        return;
      }

      const topicVariable = scope.generateUidIdentifierBasedOnNode(node);
      const pipeBodyPath = path.get("right");

      scope.push({ id: topicVariable });

      // Replace topic references with variables.
      pipeBodyPath.traverse(topicReferenceReplacementVisitor, {
        topicVariable,
      });

      // Replace the pipe expression with an assignment expression.
      path.replaceWith(
        t.sequenceExpression([
          t.assignmentExpression("=", t.cloneNode(topicVariable), left),
          right,
        ]),
      );
    },
  },
};
