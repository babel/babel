import { types as t } from "@babel/core";

const updateTopicReferenceVisitor = {
  PipelinePrimaryTopicReference(path) {
    path.replaceWith(t.cloneNode(this.topicId));
  },

  PipelineTopicExpression(path) {
    path.skip();
  },
};

export default {
  BinaryExpression(path) {
    const { scope } = path;
    const { node } = path;
    const { operator, left, right } = node;

    if (operator !== "|>") return;

    const topicVariable = scope.generateUidIdentifierBasedOnNode(left);
    scope.push({ id: topicVariable });

    const typeDispatcher = {
      PipelineTopicExpression() {
        path
          .get("right")
          .traverse(updateTopicReferenceVisitor, { topicId: topicVariable });

        return right.expression;
      },

      PipelineBareFunction() {
        let callee = right.callee;
        if (t.isIdentifier(callee, { name: "eval" })) {
          callee = t.sequenceExpression([t.numericLiteral(0), callee]);
        }

        return t.callExpression(callee, [t.cloneNode(topicVariable)]);
      },
    };

    const throwInvalidTypeError = type => {
      throw new TypeError(`Invalid smart-pipe body type "${type}."`);
    };

    const typeDispatcherMethod =
      typeDispatcher[right.type] || throwInvalidTypeError();

    const bodySubexpr = typeDispatcherMethod();

    path.replaceWith(
      t.sequenceExpression([
        t.assignmentExpression("=", t.cloneNode(topicVariable), left),
        bodySubexpr,
      ]),
    );
  },
};
