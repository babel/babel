import { types as t } from "@babel/core";
import minimalVisitor from "./minimalVisitor";

const updateTopicReferenceVisitor = {
  PipelinePrimaryTopicReference(path) {
    path.replaceWith(this.topicId);
  },
  AwaitExpression(path) {
    throw path.buildCodeFrameError(
      "await is not supported inside pipeline expressions yet",
    );
  },
};

const smartVisitor = {
  ...minimalVisitor,
  PipelineTopicExpression(path) {
    path.get("expression").traverse(smartVisitor);

    const topicId = path.scope.generateUidIdentifier("topic");

    path.traverse(updateTopicReferenceVisitor, { topicId });

    const arrowFunctionExpression = t.arrowFunctionExpression(
      [topicId],
      path.node.expression,
    );

    path.replaceWith(arrowFunctionExpression);
  },
  PipelineBareFunction(path) {
    path.replaceWith(path.node.callee);
  },
};

export default smartVisitor;
