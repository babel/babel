export default function () {
  const immutabilityVisitor = {
    enter(path, state) {
      const stop = () => {
        state.isImmutable = false;
        path.stop();
      };

      if (path.isJSXClosingElement()) {
        path.skip();
        return;
      }

      const isThisMemberExpression = path.isJSXMemberExpression({ object: { name: "this" } });
      if (path.isJSXIdentifier({ name: "ref" }) && path.parentPath.isJSXAttribute({ name: path.node }) || isThisMemberExpression) {
        return stop();
      }

      if (path.isJSXIdentifier() || path.isIdentifier()) {
        return;
      }

      if (!path.isImmutable()) stop();
    }
  };

  return {
    visitor: {
      JSXElement(path) {
        if (path.node._hoisted) return;

        const state = { isImmutable: true };
        path.traverse(immutabilityVisitor, state);

        if (state.isImmutable) {
          path.hoist();
        } else {
          path.node._hoisted = true;
        }
      }
    }
  };
}
