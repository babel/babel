/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  ArrowFunctionExpression(node) {
    this.ensureBlock();
    node.expression = false;
    node.type = "FunctionExpression";
    node.shadow = true;
  }
};
