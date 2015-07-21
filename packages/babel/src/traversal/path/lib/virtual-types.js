import * as react from "../../../transformation/helpers/react";
import * as t from "../../../types";

/**
 * [Please add a description.]
 */

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

/**
 * [Please add a description.]
 */

export var BindingIdentifier = {
  types: ["Identifier"],
  checkPath({ node, parent }) {
    return t.isBinding(node, parent);
  }
};

/**
 * [Please add a description.]
 */

export var Statement = {
  types: ["Statement"],
  checkPath({ node, parent }) {
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

/**
 * [Please add a description.]
 */

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

/**
 * [Please add a description.]
 */

export var Scope = {
  types: ["Scopable"],
  checkPath(path) {
    return t.isScope(path.node, path.parent);
  }
};

/**
 * [Please add a description.]
 */

export var Referenced = {
  checkPath(path) {
    return t.isReferenced(path.node, path.parent);
  }
};

/**
 * [Please add a description.]
 */

export var BlockScoped = {
  checkPath(path) {
    return t.isBlockScoped(path.node);
  }
};

/**
 * [Please add a description.]
 */

export var Var = {
  types: ["VariableDeclaration"],
  checkPath(path) {
    return t.isVar(path.node);
  }
};

/**
 * [Please add a description.]
 */

export var DirectiveLiteral = {
  types: ["Literal"],
  checkPath(path) {
    return path.isLiteral() && path.parentPath.isExpressionStatement();
  }
};

/**
 * [Please add a description.]
 */

export var Directive = {
  types: ["ExpressionStatement"],
  checkPath(path) {
    return path.get("expression").isLiteral();
  }
};

/**
 * [Please add a description.]
 */

export var User = {
  checkPath(path) {
    return path.node && !!path.node.loc;
  }
};

/**
 * [Please add a description.]
 */

export var Generated = {
  checkPath(path) {
    return !path.isUser();
  }
};

/**
 * [Please add a description.]
 */

export var Flow = {
  types: ["Flow", "ImportDeclaration"],
  checkPath({ node }) {
    if (t.isFlow(node)) {
      return true;
    } else if (t.isImportDeclaration(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else {
      return false;
    }
  }
};
