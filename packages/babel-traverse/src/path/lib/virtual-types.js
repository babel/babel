import type NodePath from "../index";
import { react } from "babel-types";
import * as t from "babel-types";

export let ReferencedIdentifier = {
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
  }
};

export let ReferencedMemberExpression = {
  types: ["MemberExpression"],
  checkPath({ node, parent }) {
    return t.isMemberExpression(node) && t.isReferenced(node, parent);
  }
};

export let BindingIdentifier = {
  types: ["Identifier"],
  checkPath({ node, parent }: NodePath): boolean {
    return t.isIdentifier(node) && t.isBinding(node, parent);
  }
};

export let Statement = {
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
  }
};

export let Expression = {
  types: ["Expression"],
  checkPath(path: NodePath): boolean {
    if (path.isIdentifier()) {
      return path.isReferencedIdentifier();
    } else {
      return t.isExpression(path.node);
    }
  }
};

export let Scope = {
  types: ["Scopable"],
  checkPath(path) {
    return t.isScope(path.node, path.parent);
  }
};

export let Referenced = {
  checkPath(path: NodePath): boolean {
    return t.isReferenced(path.node, path.parent);
  }
};

export let BlockScoped = {
  checkPath(path: NodePath): boolean {
    return t.isBlockScoped(path.node);
  }
};

export let Var = {
  types: ["VariableDeclaration"],
  checkPath(path: NodePath): boolean {
    return t.isVar(path.node);
  }
};

export let User = {
  checkPath(path: NodePath): boolean {
    return path.node && !!path.node.loc;
  }
};

export let Generated = {
  checkPath(path: NodePath): boolean {
    return !path.isUser();
  }
};

export let Pure = {
  checkPath(path: NodePath, opts?): boolean {
    return path.scope.isPure(path.node, opts);
  }
};

export let Flow = {
  types: ["Flow", "ImportDeclaration", "ExportDeclaration"],
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
  }
};
