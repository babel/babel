import { types as t } from "@babel/core";
import minimalVisitor from "./minimalVisitor";

const updateTopicReferenceVisitor = {
  PipelinePrimaryTopicReference(path) {
    path.replaceWith(this.topicId);
  },
  PipelineTopicExpression(path) {
    path.skip();
  },
};

const smartVisitor = {
  ...minimalVisitor,
  PipelineTopicExpression: {
    exit(path) {
      const topicId = path.scope.generateUidIdentifier("topic");

      path.traverse(updateTopicReferenceVisitor, { topicId });

      // arrow function with a single parameter will be optimized away
      // by minimal's BinaryExpression
      const arrowFunction = t.arrowFunctionExpression(
        [topicId],
        path.node.expression,
      );

      path.replaceWith(arrowFunction);
    },
  },
  PipelineBareFunction(path) {
    path.replaceWith(path.node.callee);
  },
};

export default smartVisitor;
