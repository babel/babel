import * as react from "../../../transformation/helpers/react";
import * as t from "../../../types";

export var ReferencedIdentifier = {
  types: ["Identifier", "JSXIdentifier"],
  checkPath({ node, parent }, opts) {
    if (!t.isIdentifier(node, opts)) {
      if (t.isJSXIdentifier(node, opts)) {
        if (react.isCompatTag(node.name)) return false;
      } else {
        // not a JSXIdentifier or an Identifier
        return false;
      }
    }

    // check if node is referenced
    return t.isReferenced(node, parent);
  }
};

export var Expression = {
  types: ["Expression"],
  checkPath(path) {
    if (path.isIdentifier()) {
      return path.isReferencedIdentifier();
    } else {
      return t.isExpression(path.node);
    }
  }
};

export var Scope = {
  types: ["Scopable"],
  checkPath(path) {
    return t.isScope(path.node, path.parent);
  }
};

export var Referenced = {
  checkPath(path) {
    return t.isReferenced(path.node, path.parent);
  }
};

export var BlockScoped = {
  checkPath(path) {
    return t.isBlockScoped(path.node);
  }
};

export var Var = {
  types: ["VariableDeclaration"],
  checkPath(path) {
    return t.isVar(path.node);
  }
};
