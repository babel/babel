import type NodePath from "../index";
import { react } from "@babel/types";
import * as t from "@babel/types";

export const ReferencedIdentifier = {
  types: ["Identifier", "JSXIdentifier"],
  checkPath({ node, parent }: NodePath, opts?: Object): boolean {
    if (!t.isIdentifier(node, opts) && !t.isJSXMemberExpression(parent, opts)) {
      if (t.isJSXIdentifier(node, opts)) {
        if (react.isCompatTag(node.name)) return false;
      } else {
        // not a JSXIdentifier or an Identifier
        return false;
      }
    }

    // check if node is referenced
    return t.isReferenced(node, parent);
  },
};

export const ReferencedMemberExpression = {
  types: ["MemberExpression"],
  checkPath({ node, parent }) {
    return t.isMemberExpression(node) && t.isReferenced(node, parent);
  },
};

export const BindingIdentifier = {
  types: ["Identifier"],
  checkPath({ node, parent }: NodePath): boolean {
    return t.isIdentifier(node) && t.isBinding(node, parent);
  },
};

export const Statement = {
  types: ["Statement"],
  checkPath({ node, parent }: NodePath): boolean {
    if (t.isStatement(node)) {
      if (t.isVariableDeclaration(node)) {
        if (t.isForXStatement(parent, { left: node })) return false;
        if (t.isForStatement(parent, { init: node })) return false;
      }

      return true;
    } else {
      return false;
    }
  },
};

export const Expression = {
  types: ["Expression"],
  checkPath(path: NodePath): boolean {
    if (path.isIdentifier()) {
      return path.isReferencedIdentifier();
    } else {
      return t.isExpression(path.node);
    }
  },
};

export const Scope = {
  types: ["Scopable"],
  checkPath(path) {
    return t.isScope(path.node, path.parent);
  },
};

export const Referenced = {
  checkPath(path: NodePath): boolean {
    return t.isReferenced(path.node, path.parent);
  },
};

export const BlockScoped = {
  checkPath(path: NodePath): boolean {
    return t.isBlockScoped(path.node);
  },
};

export const Var = {
  types: ["VariableDeclaration"],
  checkPath(path: NodePath): boolean {
    return t.isVar(path.node);
  },
};

export const User = {
  checkPath(path: NodePath): boolean {
    return path.node && !!path.node.loc;
  },
};

export const Generated = {
  checkPath(path: NodePath): boolean {
    return !path.isUser();
  },
};

export const Pure = {
  checkPath(path: NodePath, opts?): boolean {
    return path.scope.isPure(path.node, opts);
  },
};

export const Flow = {
  types: ["Flow", "ImportDeclaration", "ExportDeclaration", "ImportSpecifier"],
  checkPath({ node }: NodePath): boolean {
    if (t.isFlow(node)) {
      return true;
    } else if (t.isImportDeclaration(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else if (t.isExportDeclaration(node)) {
      return node.exportKind === "type";
    } else if (t.isImportSpecifier(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else {
      return false;
    }
  },
};

// TODO: 7.0 Backwards Compat
export const RestProperty = {
  types: ["RestElement"],
  checkPath(path: NodePath): boolean {
    return path.parentPath && path.parentPath.isObjectPattern();
  },
};

export const SpreadProperty = {
  types: ["RestElement"],
  checkPath(path: NodePath): boolean {
    return path.parentPath && path.parentPath.isObjectExpression();
  },
};

export const ExistentialTypeParam = {
  types: ["ExistsTypeAnnotation"],
};

export const NumericLiteralTypeAnnotation = {
  types: ["NumberLiteralTypeAnnotation"],
};

export const ForAwaitStatement = {
  types: ["ForOfStatement"],
  checkPath({ node }: NodePath): boolean {
    return node.await === true;
  },
};
