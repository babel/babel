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
  isReferenced as nodeIsReferenced,
  isScope as nodeIsScope,
  isStatement as nodeIsStatement,
  isVar as nodeIsVar,
  isVariableDeclaration,
  react,
} from "@babel/types";
import type * as t from "@babel/types";
const { isCompatTag } = react;
import type { VirtualTypeAliases } from "./virtual-types";

export interface VirtualTypeNodePathValidators {
  isBindingIdentifier(
    opts?: object,
  ): this is NodePath<VirtualTypeAliases["BindingIdentifier"]>;
  isBlockScoped(opts?: object): boolean;
  isExistentialTypeParam(
    opts?: object,
  ): this is NodePath<VirtualTypeAliases["ExistentialTypeParam"]>;
  isExpression(opts?: object): this is NodePath<t.Expression>;
  isFlow(opts?: object): this is NodePath<t.Flow>;
  isForAwaitStatement(
    opts?: object,
  ): this is NodePath<VirtualTypeAliases["ForAwaitStatement"]>;
  isGenerated(opts?: object): boolean;
  isNumericLiteralTypeAnnotation(
    opts?: object,
  ): this is NodePath<VirtualTypeAliases["NumericLiteralTypeAnnotation"]>;
  isPure(opts?: object): boolean;
  isReferenced(opts?: object): boolean;
  isReferencedIdentifier(
    opts?: object,
  ): this is NodePath<VirtualTypeAliases["ReferencedIdentifier"]>;
  isReferencedMemberExpression(
    opts?: object,
  ): this is NodePath<VirtualTypeAliases["ReferencedMemberExpression"]>;
  isRestProperty(opts?: object): this is NodePath<t.RestProperty>;
  isScope(opts?: object): this is NodePath<VirtualTypeAliases["Scope"]>;
  isSpreadProperty(opts?: object): this is NodePath<t.SpreadProperty>;
  isStatement(opts?: object): this is NodePath<t.Statement>;
  isUser(opts?: object): boolean;
  isVar(opts?: object): this is NodePath<VirtualTypeAliases["Var"]>;
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
  return nodeIsBlockScoped(this.node, this.parent);
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

export function isPure(this: NodePath, opts?): boolean {
  return this.scope.isPure(this.node, opts);
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
// todo: we should check RestProperty first
export function isRestProperty(this: NodePath): boolean {
  return this.parentPath && this.parentPath.isObjectPattern();
}

// todo: we should check RestProperty first
export function isSpreadProperty(this: NodePath): boolean {
  return this.parentPath && this.parentPath.isObjectExpression();
}

// todo: we should check isForOfStatement first
export function isForAwaitStatement(this: NodePath<t.ForOfStatement>): boolean {
  return this.node.await === true;
}
