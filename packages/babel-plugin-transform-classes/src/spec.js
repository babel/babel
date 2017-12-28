import VanillaTransformer from "./vanilla";
import { types as t } from "@babel/core";

export default class SpecClassTransformer extends VanillaTransformer {
  constructor() {
    super(...arguments);
    this.isSpec = true;
  }

  _getMethodRef(node, isStatic) {
    return t.memberExpression(
      isStatic
        ? this.classRef
        : t.memberExpression(this.classRef, t.identifier("prototype")),
      t.identifier(node.key.name),
    );
  }

  _processMethod(node, scope) {
    if (t.isClassMethod(node)) {
      const methodRef = this._getMethodRef(node, node.static);

      scope.path
        .get("body")
        .unshiftContainer(
          "body",
          t.expressionStatement(
            t.callExpression(this.file.addHelper("newClassMethodCheck"), [
              t.thisExpression(),
              methodRef,
            ]),
          ),
        );
    }
    // Don't prevent pushign to map.
    return false;
  }
}
