import type NodePath from "../index.ts";
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
import type { VirtualTypeAliases } from "./virtual-types.ts";

type Options<Obj> = Partial<{
  [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
      ? t.Node[]
      : Obj[Prop];
}>;

export interface VirtualTypeNodePathValidators {
  isBindingIdentifier(
    this: NodePath,
  ): this is NodePath<VirtualTypeAliases["BindingIdentifier"]>;
  isBlockScoped(this: NodePath): boolean;
  /**
   * @deprecated
   */
  isExistentialTypeParam(
    this: NodePath,
  ): this is NodePath<VirtualTypeAliases["ExistentialTypeParam"]>;
  isExpression(this: NodePath): this is NodePath<t.Expression>;
  isFlow(this: NodePath): this is NodePath<t.Flow>;
  isForAwaitStatement(
    this: NodePath,
  ): this is NodePath<VirtualTypeAliases["ForAwaitStatement"]>;
  isGenerated(): this is NodePath<VirtualTypeAliases["Generated"]>;
  /**
   * @deprecated
   */
  isNumericLiteralTypeAnnotation(this: NodePath): void;
  isPure(): boolean;
  isReferenced(): boolean;
  isReferencedIdentifier<
    Opts extends Options<VirtualTypeAliases["ReferencedIdentifier"]>,
  >(
    this: NodePath,
    opts?: Opts,
  ): this is NodePath<VirtualTypeAliases["ReferencedIdentifier"] & Opts>;
  isReferencedMemberExpression(
    this: NodePath,
  ): this is NodePath<VirtualTypeAliases["ReferencedMemberExpression"]>;
  isRestProperty(this: NodePath): this is NodePath<t.RestProperty>;
  isScope(this: NodePath): this is NodePath<VirtualTypeAliases["Scope"]>;
  isSpreadProperty(this: NodePath): this is NodePath<t.SpreadProperty>;
  isStatement(this: NodePath): this is NodePath<t.Statement>;
  isUser(): this is NodePath<VirtualTypeAliases["User"]>;
  isVar(this: NodePath): this is NodePath<VirtualTypeAliases["Var"]>;
}

export function isReferencedIdentifier(
  this: NodePath,
  opts?: Options<VirtualTypeAliases["ReferencedIdentifier"]>,
): boolean {
  const { node, parent } = this;
  if (isIdentifier(node, opts)) {
    return nodeIsReferenced(node, parent, this.parentPath.parent);
  } else if (isJSXIdentifier(node, opts)) {
    if (!isJSXMemberExpression(parent) && isCompatTag(node.name)) return false;
    return nodeIsReferenced(node, parent, this.parentPath.parent);
  } else {
    // not a JSXIdentifier or an Identifier
    return false;
  }
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
  return !!this.node?.loc;
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
  return nodeIsRestElement(this.node) && this.parentPath?.isObjectPattern();
}

export function isSpreadProperty(this: NodePath): boolean {
  return nodeIsRestElement(this.node) && this.parentPath?.isObjectExpression();
}

export function isForAwaitStatement(this: NodePath): boolean {
  return isForOfStatement(this.node, { await: true });
}

if (!process.env.BABEL_8_BREAKING && !USE_ESM) {
  // eslint-disable-next-line no-restricted-globals
  exports.isExistentialTypeParam = function isExistentialTypeParam(
    this: NodePath,
  ): void {
    throw new Error(
      "`path.isExistentialTypeParam` has been renamed to `path.isExistsTypeAnnotation()` in Babel 7.",
    );
  };

  // eslint-disable-next-line no-restricted-globals
  exports.isNumericLiteralTypeAnnotation =
    function isNumericLiteralTypeAnnotation(this: NodePath): void {
      throw new Error(
        "`path.isNumericLiteralTypeAnnotation()` has been renamed to `path.isNumberLiteralTypeAnnotation()` in Babel 7.",
      );
    };
}
