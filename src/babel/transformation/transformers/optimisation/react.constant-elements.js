export var metadata = {
  optional: true
};

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

export function JSXElement(node, parent, scope, file) {
  if (node._hoisted) return;

  var state = { isImmutable: true };
  this.traverse(immutabilityVisitor, state);

  if (state.isImmutable) {
    this.hoist();
  } else {
    node._hoisted = true;
  }
}
