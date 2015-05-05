import * as t from "../../types";

export var ReferencedIdentifier = {
  type: "Identifier",
  checkPath(path, opts) {
    return t.isReferencedIdentifier(path.node, path.parent, opts);
  }
};

export var Scope = {
  type: "Scopable",
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
  type: "VariableDeclaration",
  checkPath(path) {
    return t.isVar(path.node);
  }
};
