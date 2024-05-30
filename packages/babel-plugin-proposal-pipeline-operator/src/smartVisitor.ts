import { types as t } from "@babel/core";
import type { PluginPass, Visitor } from "@babel/core";

const updateTopicReferenceVisitor: Visitor<{ topicId: t.Identifier }> = {
  PipelinePrimaryTopicReference(path) {
    path.replaceWith(t.cloneNode(this.topicId));
  },
  PipelineTopicExpression(path) {
    path.skip();
  },
};

const smartVisitor: Visitor<PluginPass> = {
  BinaryExpression(path) {
    const { scope } = path;
    const { node } = path;
    const { operator, left, right } = node;
    if (operator !== "|>") return;

    const placeholder = scope.generateUidIdentifierBasedOnNode(left);
    scope.push({ id: placeholder });

    let call;
    if (t.isPipelineTopicExpression(right)) {
      path
        .get("right")
        .traverse(updateTopicReferenceVisitor, { topicId: placeholder });

      call = right.expression;
    } else {
      // PipelineBareFunction
      let callee = (right as t.CallExpression).callee;
      if (t.isIdentifier(callee, { name: "eval" })) {
        callee = t.sequenceExpression([t.numericLiteral(0), callee]);
      }

      call = t.callExpression(callee, [t.cloneNode(placeholder)]);
    }

    path.replaceWith(
      t.sequenceExpression([
        t.assignmentExpression(
          "=",
          t.cloneNode(placeholder),
          // left must not be a PrivateName because operator is not "in"
          left as t.Expression,
        ),
        call,
      ]),
    );
  },
};

export default smartVisitor;
