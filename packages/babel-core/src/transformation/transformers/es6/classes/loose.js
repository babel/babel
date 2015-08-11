import VanillaTransformer from "./vanilla";
import * as t from "babel-types";

/**
 * [Please add a description.]
 */

export default class LooseClassTransformer extends VanillaTransformer {
  constructor() {
    super(...arguments);
    this.isLoose = true;
  }

  /**
   * [Please add a description.]
   */

  _processMethod(node) {
    if (!node.decorators) {
      // use assignments instead of define properties for loose classes

      var classRef = this.classRef;
      if (!node.static) classRef = t.memberExpression(classRef, t.identifier("prototype"));
      var methodName = t.memberExpression(classRef, node.key, node.computed || t.isLiteral(node.key));

      var expr = t.expressionStatement(t.assignmentExpression("=", methodName, node.value));
      t.inheritsComments(expr, node);
      this.body.push(expr);
      return true;
    }
  }
}
