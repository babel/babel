import * as t from "babel-types";

export let metadata = {
  group: "builtin-pre",
  optional: true
};

export let visitor = {
  ArrowFunctionExpression(node, parent, scope, file) {
    if (node.shadow) return;
    node.shadow = { this: false };

    let boundThis = t.thisExpression();
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
