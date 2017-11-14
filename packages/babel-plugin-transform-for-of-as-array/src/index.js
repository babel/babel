export default function({ types: t }) {
  const visitor = {
    ForOfStatement(path) {
      const { scope } = path;
      const { left, right, body } = path.node;
      const i = scope.generateUidIdentifier("i");
      let array = scope.maybeGenerateMemoised(right, true);

      const inits = [t.variableDeclarator(i, t.numericLiteral(0))];
      if (array) {
        inits.push(t.variableDeclarator(array, right));
      } else {
        array = right;
      }

      const item = t.memberExpression(array, t.clone(i), true);
      let assignment;
      if (t.isVariableDeclaration(left)) {
        assignment = left;
        assignment.declarations[0].init = item;
      } else {
        assignment = t.expressionStatement(
          t.assignmentExpression("=", left, item),
        );
      }

      const block = t.toBlock(body);
      block.body.unshift(assignment);

      path.replaceWith(
        t.forStatement(
          t.variableDeclaration("let", inits),
          t.binaryExpression(
            "<",
            t.clone(i),
            t.memberExpression(t.clone(array), t.identifier("length")),
          ),
          t.updateExpression("++", t.clone(i)),
          block,
        ),
      );
    },
  };

  return { visitor };
}
