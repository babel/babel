import * as t from "../../../types";

export var ReferencedIdentifier = {
  types: ["Identifier", "JSXIdentifier"],
  checkPath({ node, parent }, opts) {
    return (t.isIdentifier(node, opts) || t.isJSXIdentifier(node, opts)) && t.isReferenced(node, parent);
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
