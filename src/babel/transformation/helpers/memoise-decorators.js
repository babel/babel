import * as t from "../../types";

export default function (decorators, scope) {
  for (var i = 0; i < decorators.length; i++) {
    var decorator = decorators[i];
    var expression = decorator.expression;
    if (!t.isMemberExpression(expression)) continue;

    var temp = scope.maybeGenerateMemoised(expression.object);
    var ref;

    var nodes = [];

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

  return decorators;
}
