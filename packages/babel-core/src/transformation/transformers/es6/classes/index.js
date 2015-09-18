import LooseTransformer from "./loose";
import VanillaTransformer from "./vanilla";
import * as t from "babel-types";
import { bare } from "../../../helpers/name-method";

export let visitor = {
  ClassDeclaration(node) {
    return t.variableDeclaration("var", [
      t.variableDeclarator(node.id, t.toExpression(node))
    ]);
  },

  ClassExpression(node, parent, scope, file) {
    let inferred = bare(node, parent, scope);
    if (inferred) return inferred;

    if (file.isLoose("es6.classes")) {
      return new LooseTransformer(this, file).run();
    } else {
      return new VanillaTransformer(this, file).run();
    }
  }
};
