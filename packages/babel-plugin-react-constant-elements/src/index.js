export default function () {
  var immutabilityVisitor = {
    enter(node, parent, scope, state) {
      var stop = () => {
        state.isImmutable = false;
        this.stop();
      };

      if (this.isJSXClosingElement()) {
        this.skip();
        return;
      }

      if (this.isJSXIdentifier({ name: "ref" }) && this.parentPath.isJSXAttribute({ name: node })) {
        return stop();
      }

      if (this.isJSXIdentifier() || this.isIdentifier() || this.isJSXMemberExpression()) {
        return;
      }

      if (!this.isImmutable()) stop();
    }
  };

  return {
    metadata: {
      group: "builtin-basic"
    },

    visitor: {
      JSXElement(node) {
        if (node._hoisted) return;

        var state = { isImmutable: true };
        this.traverse(immutabilityVisitor, state);

        if (state.isImmutable) {
          this.hoist();
        } else {
          node._hoisted = true;
        }
      }
    }
  };
}
