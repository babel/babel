import type NodePath from "../index";
import {
  isBinding,
  isBlockScoped as nodeIsBlockScoped,
  isExportDeclaration,
  isExpression as nodeIsExpression,
  isFlow as nodeIsFlow,
  isForStatement,
  isForXStatement,
  isIdentifier,
  isImportDeclaration,
  isImportSpecifier,
  isJSXIdentifier,
  isJSXMemberExpression,
  isMemberExpression,
  isRestElement as nodeIsRestElement,
  isReferenced as nodeIsReferenced,
  isScope as nodeIsScope,
  isStatement as nodeIsStatement,
  isVar as nodeIsVar,
  isVariableDeclaration,
  react,
  isForOfStatement,
} from "@babel/types";
import type * as t from "@babel/types";
const { isCompatTag } = react;
import type { VirtualTypeAliases } from "./virtual-types";

export interface VirtualTypeNodePathValidators {
  isBindingIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & VirtualTypeAliases["BindingIdentifier"]>;
  isBlockScoped(opts?: object): boolean;
  /**
   * @deprecated
   */
  isExistentialTypeParam<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & VirtualTypeAliases["ExistentialTypeParam"]>;
  isExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Expression>;
  isFlow<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Flow>;
  isForAwaitStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & VirtualTypeAliases["ForAwaitStatement"]>;
  isGenerated(opts?: object): boolean;
  /**
   * @deprecated
   */
  isNumericLiteralTypeAnnotation(opts?: object): void;
  isPure(opts?: object): boolean;
  isReferenced(opts?: object): boolean;
  isReferencedIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & VirtualTypeAliases["ReferencedIdentifier"]>;
  isReferencedMemberExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & VirtualTypeAliases["ReferencedMemberExpression"]>;
  isRestProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.RestProperty>;
  isScope<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & VirtualTypeAliases["Scope"]>;
  isSpreadProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.SpreadProperty>;
  isStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Statement>;
  isUser(opts?: object): boolean;
  isVar<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & VirtualTypeAliases["Var"]>;
}

export function isReferencedIdentifier(this: NodePath, opts?: any): boolean {
  const { node, parent } = this;
  if (!isIdentifier(node, opts) && !isJSXMemberExpression(parent, opts)) {
    if (isJSXIdentifier(node, opts)) {
      if (isCompatTag(node.name)) return false;
    } else {
      // not a JSXIdentifier or an Identifier
      return false;
    }
  }

  // check if node is referenced
  return nodeIsReferenced(node, parent, this.parentPath.parent);
}

export function isReferencedMemberExpression(this: NodePath): boolean {
  const { node, parent } = this;
  return isMemberExpression(node) && nodeIsReferenced(node, parent);
}

export function isBindingIdentifier(this: NodePath): boolean {
  const { node, parent } = this;
  const grandparent = this.parentPath.parent;
  return isIdentifier(node) && isBinding(node, parent, grandparent);
}

export function isStatement(this: NodePath): boolean {
  const { node, parent } = this;
  if (nodeIsStatement(node)) {
    if (isVariableDeclaration(node)) {
      if (isForXStatement(parent, { left: node })) return false;
      if (isForStatement(parent, { init: node })) return false;
    }

    return true;
  } else {
    return false;
  }
}

export function isExpression(this: NodePath): boolean {
  if (this.isIdentifier()) {
    return this.isReferencedIdentifier();
  } else {
    return nodeIsExpression(this.node);
  }
}

export function isScope(this: NodePath): boolean {
  return nodeIsScope(this.node, this.parent);
}

export function isReferenced(this: NodePath): boolean {
  return nodeIsReferenced(this.node, this.parent);
}

export function isBlockScoped(this: NodePath): boolean {
  return nodeIsBlockScoped(this.node);
}

export function isVar(this: NodePath): boolean {
  return nodeIsVar(this.node);
}

export function isUser(this: NodePath): boolean {
  return this.node && !!this.node.loc;
}

export function isGenerated(this: NodePath): boolean {
  return !this.isUser();
}

export function isPure(this: NodePath, constantsOnly?: boolean): boolean {
  return this.scope.isPure(this.node, constantsOnly);
}

export function isFlow(this: NodePath): boolean {
  const { node } = this;
  if (nodeIsFlow(node)) {
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
}

// TODO: 7.0 Backwards Compat
export function isRestProperty(this: NodePath): boolean {
  return (
    nodeIsRestElement(this.node) &&
    this.parentPath &&
    this.parentPath.isObjectPattern()
  );
}

export function isSpreadProperty(this: NodePath): boolean {
  return (
    nodeIsRestElement(this.node) &&
    this.parentPath &&
    this.parentPath.isObjectExpression()
  );
}

export function isForAwaitStatement(this: NodePath): boolean {
  return isForOfStatement(this.node, { await: true });
}

export function isExistentialTypeParam(this: NodePath): void {
  throw new Error(
    "`path.isExistentialTypeParam` has been renamed to `path.isExistsTypeAnnotation()` in Babel 7.",
  );
}

export function isNumericLiteralTypeAnnotation(this: NodePath): void {
  throw new Error(
    "`path.isNumericLiteralTypeAnnotation()` has been renamed to `path.isNumberLiteralTypeAnnotation()` in Babel 7.",
  );
}
