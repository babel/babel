import type { NodePath } from "babel-traverse"
import * as t from "babel-types";

export default function bindifyDecorators(decorators: Array<NodePath>): Array<NodePath> {
  for (let decoratorPath of decorators) {
    let decorator = decoratorPath.node;
    let expression = decorator.expression;
    if (!t.isMemberExpression(expression)) continue;

    let temp = decoratorPath.scope.maybeGenerateMemoised(expression.object);
    let ref;

    let nodes = [];

    if (temp) {
      ref = temp;
      nodes.push(t.assignmentExpression("=", temp, expression.object));
    } else {
      ref = expression.object;
    }

    nodes.push(t.callExpression(
      t.memberExpression(
        t.memberExpression(ref, expression.property, expression.computed),
        t.identifier("bind")
      ),
      [ref]
    ));

    if (nodes.length === 1) {
      decorator.expression = nodes[0];
    } else {
      decorator.expression = t.sequenceExpression(nodes);
    }
  }
}
