import type NodePath from "../index";
import {
  isBinding,
  isBlockScoped,
  isExportDeclaration,
  isExpression,
  isFlow,
  isForStatement,
  isForXStatement,
  isIdentifier,
  isImportDeclaration,
  isImportSpecifier,
  isJSXIdentifier,
  isJSXMemberExpression,
  isMemberExpression,
  isReferenced,
  isScope,
  isStatement,
  isVar,
  isVariableDeclaration,
  react,
} from "@babel/types";
import type * as t from "@babel/types";
const { isCompatTag } = react;

export const ReferencedIdentifier = {
  types: ["Identifier", "JSXIdentifier"],
  checkPath(path: NodePath, opts?: any): boolean {
    const { node, parent } = path;
    if (!isIdentifier(node, opts) && !isJSXMemberExpression(parent, opts)) {
      if (isJSXIdentifier(node, opts)) {
        if (isCompatTag(node.name)) return false;
      } else {
        // not a JSXIdentifier or an Identifier
        return false;
      }
    }

    // check if node is referenced
    return isReferenced(node, parent, path.parentPath.parent);
  },
};

export const ReferencedMemberExpression = {
  types: ["MemberExpression"],
  checkPath({ node, parent }) {
    return isMemberExpression(node) && isReferenced(node, parent);
  },
};

export const BindingIdentifier = {
  types: ["Identifier"],
  checkPath(path: NodePath): boolean {
    const { node, parent } = path;
    const grandparent = path.parentPath.parent;
    return isIdentifier(node) && isBinding(node, parent, grandparent);
  },
};

export const Statement = {
  types: ["Statement"],
  checkPath({ node, parent }: NodePath): boolean {
    if (isStatement(node)) {
      if (isVariableDeclaration(node)) {
        if (isForXStatement(parent, { left: node })) return false;
        if (isForStatement(parent, { init: node })) return false;
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
      return isExpression(path.node);
    }
  },
};

export const Scope = {
  // When pattern is inside the function params, it is a scope
  types: ["Scopable", "Pattern"],
  checkPath(path) {
    return isScope(path.node, path.parent);
  },
};

export const Referenced = {
  checkPath(path: NodePath): boolean {
    return isReferenced(path.node, path.parent);
  },
};

export const BlockScoped = {
  checkPath(path: NodePath): boolean {
    return isBlockScoped(path.node);
  },
};

export const Var = {
  types: ["VariableDeclaration"],
  checkPath(path: NodePath): boolean {
    return isVar(path.node);
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
    if (isFlow(node)) {
      return true;
    } else if (isImportDeclaration(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else if (isExportDeclaration(node)) {
      return node.exportKind === "type";
    } else if (isImportSpecifier(node)) {
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
  checkPath({ node }: NodePath<t.ForOfStatement>): boolean {
    return node.await === true;
  },
};
