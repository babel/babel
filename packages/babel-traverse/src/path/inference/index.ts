import type NodePath from "../index.ts";
import * as inferers from "./inferers.ts";
import {
  anyTypeAnnotation,
  isAnyTypeAnnotation,
  isArrayTypeAnnotation,
  isBooleanTypeAnnotation,
  isEmptyTypeAnnotation,
  isFlowBaseAnnotation,
  isGenericTypeAnnotation,
  isIdentifier,
  isMixedTypeAnnotation,
  isNumberTypeAnnotation,
  isStringTypeAnnotation,
  isTSArrayType,
  isTSTypeAnnotation,
  isTSTypeReference,
  isTupleTypeAnnotation,
  isTypeAnnotation,
  isUnionTypeAnnotation,
  isVoidTypeAnnotation,
  stringTypeAnnotation,
  voidTypeAnnotation,
} from "@babel/types";
import type * as t from "@babel/types";

/**
 * Infer the type of the current `NodePath`.
 */

export function getTypeAnnotation(this: NodePath): t.FlowType | t.TSType {
  let type = this.getData("typeAnnotation");
  if (type != null) {
    return type;
  }
  type = _getTypeAnnotation.call(this) || anyTypeAnnotation();
  if (isTypeAnnotation(type) || isTSTypeAnnotation(type)) {
    type = type.typeAnnotation;
  }
  this.setData("typeAnnotation", type);
  return type;
}

// Used to avoid infinite recursion in cases like
//   var b, c; if (0) { c = 1; b = c; } c = b;
// It also works with indirect recursion.
const typeAnnotationInferringNodes = new WeakSet();

/**
 * todo: split up this method
 */

export function _getTypeAnnotation(this: NodePath): any {
  const node = this.node;

  if (!node) {
    // handle initializerless variables, add in checks for loop initializers too
    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
      const declar = this.parentPath.parentPath;
      const declarParent = declar.parentPath;

      // for (let NODE in bar) {}
      if (declar.key === "left" && declarParent.isForInStatement()) {
        return stringTypeAnnotation();
      }

      // for (let NODE of bar) {}
      if (declar.key === "left" && declarParent.isForOfStatement()) {
        return anyTypeAnnotation();
      }

      return voidTypeAnnotation();
    } else {
      return;
    }
  }

  // @ts-expect-error typeAnnotation may not index node
  if (node.typeAnnotation) {
    // @ts-expect-error typeAnnotation may not index node
    return node.typeAnnotation;
  }

  if (typeAnnotationInferringNodes.has(node)) {
    // Bail out from type inference to avoid infinite loops
    return;
  }
  typeAnnotationInferringNodes.add(node);

  try {
    let inferer =
      // @ts-expect-error inferers do not cover all AST types
      inferers[node.type];
    if (inferer) {
      return inferer.call(this, node);
    }

    // @ts-expect-error inferers do not cover all AST types
    inferer = inferers[this.parentPath.type];
    if (inferer?.validParent) {
      return this.parentPath.getTypeAnnotation();
    }
  } finally {
    typeAnnotationInferringNodes.delete(node);
  }
}

export function isBaseType(
  this: NodePath,
  baseName: string,
  soft?: boolean,
): boolean {
  return _isBaseType(baseName, this.getTypeAnnotation(), soft);
}

function _isBaseType(
  baseName: string,
  type?: t.FlowType | t.TSType,
  soft?: boolean,
): boolean {
  if (baseName === "string") {
    return isStringTypeAnnotation(type);
  } else if (baseName === "number") {
    return isNumberTypeAnnotation(type);
  } else if (baseName === "boolean") {
    return isBooleanTypeAnnotation(type);
  } else if (baseName === "any") {
    return isAnyTypeAnnotation(type);
  } else if (baseName === "mixed") {
    return isMixedTypeAnnotation(type);
  } else if (baseName === "empty") {
    return isEmptyTypeAnnotation(type);
  } else if (baseName === "void") {
    return isVoidTypeAnnotation(type);
  } else {
    if (soft) {
      return false;
    } else {
      throw new Error(`Unknown base type ${baseName}`);
    }
  }
}

export function couldBeBaseType(this: NodePath, name: string): boolean {
  const type = this.getTypeAnnotation();
  if (isAnyTypeAnnotation(type)) return true;

  if (isUnionTypeAnnotation(type)) {
    for (const type2 of type.types) {
      if (isAnyTypeAnnotation(type2) || _isBaseType(name, type2, true)) {
        return true;
      }
    }
    return false;
  } else {
    return _isBaseType(name, type, true);
  }
}

export function baseTypeStrictlyMatches(
  this: NodePath,
  rightArg: NodePath,
): boolean {
  const left = this.getTypeAnnotation();
  const right = rightArg.getTypeAnnotation();

  if (!isAnyTypeAnnotation(left) && isFlowBaseAnnotation(left)) {
    return right.type === left.type;
  }
  return false;
}

export function isGenericType(this: NodePath, genericName: string): boolean {
  const type = this.getTypeAnnotation();
  if (genericName === "Array") {
    // T[]
    if (
      isTSArrayType(type) ||
      isArrayTypeAnnotation(type) ||
      isTupleTypeAnnotation(type)
    ) {
      return true;
    }
  }
  return (
    (isGenericTypeAnnotation(type) &&
      isIdentifier(type.id, {
        name: genericName,
      })) ||
    (isTSTypeReference(type) &&
      isIdentifier(type.typeName, {
        name: genericName,
      }))
  );
}
