import { types as t } from "@babel/core";
import type { PluginPass, NodePath, Visitor } from "@babel/core";

type State = {
  topicReferences: NodePath<t.TopicReference>[];
  sideEffectsBeforeFirstTopicReference: boolean;
};

const topicReferenceVisitor: Visitor<State> = {
  exit(path, state) {
    if (path.isTopicReference()) {
      state.topicReferences.push(path);
    } else {
      if (
        state.topicReferences.length === 0 &&
        !state.sideEffectsBeforeFirstTopicReference &&
        !path.isPure()
      ) {
        state.sideEffectsBeforeFirstTopicReference = true;
      }
    }
  },
  "ClassBody|Function"(_, state) {
    if (state.topicReferences.length === 0) {
      state.sideEffectsBeforeFirstTopicReference = true;
    }
  },
};

// This visitor traverses `BinaryExpression`
// and replaces any that use `|>`
// with sequence expressions containing assignment expressions
// with automatically generated variables,
// from inside to outside, from left to right.
const visitor: Visitor<PluginPass> = {
  BinaryExpression: {
    exit(path) {
      const { scope, node } = path;

      if (node.operator !== "|>") {
        // The path node is a binary expression,
        // but it is not a pipe expression.
        return;
      }

      const pipeBodyPath = path.get("right");
      if (pipeBodyPath.node.type === "TopicReference") {
        // If the pipe body is itself a lone topic reference,
        // then replace the whole expression with its left operand.
        path.replaceWith(node.left);
        return;
      }

      const visitorState: State = {
        topicReferences: [],
        // pipeBodyPath might be a function, and it won't be visited by
        // topicReferenceVisitor because traverse() skips the top-level
        // node. We must handle that case here manually.
        sideEffectsBeforeFirstTopicReference: pipeBodyPath.isFunction(),
      };
      pipeBodyPath.traverse(topicReferenceVisitor, visitorState);

      if (
        visitorState.topicReferences.length === 1 &&
        (!visitorState.sideEffectsBeforeFirstTopicReference ||
          path.scope.isPure(node.left, true))
      ) {
        visitorState.topicReferences[0].replaceWith(node.left);
        path.replaceWith(node.right);
        return;
      }

      const topicVariable = scope.generateUidIdentifierBasedOnNode(node);
      scope.push({ id: topicVariable });

      // Replace topic references with the topic variable.
      visitorState.topicReferences.forEach(path =>
        path.replaceWith(t.cloneNode(topicVariable)),
      );

      // Replace the pipe expression itself with an assignment expression.
      path.replaceWith(
        t.sequenceExpression([
          t.assignmentExpression(
            "=",
            t.cloneNode(topicVariable),
            // @ts-expect-error node.left must not be a PrivateName when operator is |>
            node.left,
          ),
          node.right,
        ]),
      );
    },
  },
};

export default visitor;
