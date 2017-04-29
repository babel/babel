export default function ({ types: t }) {

  function createCondition(ref, access, nextProperty, bailout) {

    return t.conditionalExpression(
      createCheckAgainstNull(
        t.AssignmentExpression("=", ref, access)
      ),

      t.memberExpression(ref, nextProperty),
      bailout,
    );
  }

  function createCheckAgainstNull(left) {
    return t.BinaryExpression("!=", left, t.NullLiteral());
  }

  function isNodeOptional(node) {
    return node.optional === true;
  }

  return {
    visitor: {
      MemberExpression(path, state) {
        if (!isNodeOptional(path.node)) {
          return;
        }

        const { object, property } = path.node;

        if (!state.optionalTemp) {
          const id = path.scope.generateUidIdentifier();

          state.optionalTemp = id;
          path.scope.push({ id });
        }

        const remplacement = createCondition(
          state.optionalTemp,
          object,
          property,
          t.identifier("undefined")
        );

        path.replaceWith(remplacement);
      },
    },
  };
}
