import * as t from "babel-types";

export var metadata = {
  group: "builtin-pre",
  optional: true
};

export var visitor = {
  ArrowFunctionExpression(node, parent, scope, file) {
    if (node.shadow) return;
    node.shadow = { this: false };

    var boundThis = t.thisExpression();
    boundThis._forceShadow = this;

    // make sure that arrow function won't be instantiated
    t.ensureBlock(node);
    this.get("body").unshiftContainer("body", t.expressionStatement(t.callExpression(file.addHelper("new-arrow-check"), [
      t.thisExpression(),
      boundThis
    ])));

    return t.callExpression(t.memberExpression(node, t.identifier("bind")), [t.thisExpression()]);
  }
};
