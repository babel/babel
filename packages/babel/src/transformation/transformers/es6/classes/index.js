import LooseTransformer from "./loose";
import VanillaTransformer from "./vanilla";
import * as t from "../../../../types";
import { bare } from "../../../helpers/name-method";

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  ClassDeclaration(node) {
    return t.variableDeclaration("let", [
      t.variableDeclarator(node.id, t.toExpression(node))
    ]);
  },

  /**
   * [Please add a description.]
   */

  ClassExpression(node, parent, scope, file) {
    var inferred = bare(node, parent, scope);
    if (inferred) return inferred;

    if (file.isLoose("es6.classes")) {
      return new LooseTransformer(this, file).run();
    } else {
      return new VanillaTransformer(this, file).run();
    }
  }
};
