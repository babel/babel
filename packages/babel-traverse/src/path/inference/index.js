import type NodePath from "./index";
import * as inferers from "./inferers";
import * as t from "babel-types";

/**
 * Infer the type of the current `NodePath`.
 * @public
 * @name NodePath.prototype.getTypeAnnotation
 */

export function getTypeAnnotation(): Object {
  if (this.typeAnnotation) return this.typeAnnotation;

  let type = this._getTypeAnnotation() || t.anyTypeAnnotation();
  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
  return this.typeAnnotation = type;
}

/**
 * @todo split up this method
 * @private
 */

export function _getTypeAnnotation(): ?Object {
  let node = this.node;

  if (!node) {
    // handle initializerless variables, add in checks for loop initializers too
    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
      let declar       = this.parentPath.parentPath;
      let declarParent = declar.parentPath;

      // for (let NODE in bar) {}
      if (declar.key === "left" && declarParent.isForInStatement()) {
        return t.stringTypeAnnotation();
      }

      // for (let NODE of bar) {}
      if (declar.key === "left" && declarParent.isForOfStatement()) {
        return t.anyTypeAnnotation();
      }

      return t.voidTypeAnnotation();
    } else {
      return;
    }
  }

  if (node.typeAnnotation) {
    return node.typeAnnotation;
  }

  let inferer = inferers[node.type];
  if (inferer) {
    return inferer.call(this, node);
  }

  inferer = inferers[this.parentPath.type];
  if (inferer && inferer.validParent) {
    return this.parentPath.getTypeAnnotation();
  }
}

/**
 * [Needs description]
 * @public
 * @name NodePath.prototype.isBaseType
 */

export function isBaseType(baseName: string, soft?: boolean): boolean {
  return _isBaseType(baseName, this.getTypeAnnotation(), soft);
}

/**
 * @private
 */

function _isBaseType(baseName: string, type?, soft?): boolean {
  if (baseName === "string") {
    return t.isStringTypeAnnotation(type);
  } else if (baseName === "number") {
    return t.isNumberTypeAnnotation(type);
  } else if (baseName === "boolean") {
    return t.isBooleanTypeAnnotation(type);
  } else if (baseName === "any") {
    return t.isAnyTypeAnnotation(type);
  } else if (baseName === "mixed") {
    return t.isMixedTypeAnnotation(type);
  } else if (baseName === "void") {
    return t.isVoidTypeAnnotation(type);
  } else {
    if (soft) {
      return false;
    } else {
      throw new Error(`Unknown base type ${baseName}`);
    }
  }
}

/**
 * [Needs description]
 * @public
 * @name NodePath.prototype.couldBeBaseType
 */

export function couldBeBaseType(name: string): boolean {
  let type = this.getTypeAnnotation();
  if (t.isAnyTypeAnnotation(type)) return true;

  if (t.isUnionTypeAnnotation(type)) {
    for (let type2 of (type.types: Array<Object>)) {
      if (t.isAnyTypeAnnotation(type2) || _isBaseType(name, type2, true)) {
        return true;
      }
    }
    return false;
  } else {
    return _isBaseType(name, type, true);
  }
}

/**
 * [Needs description]
 * @public
 * @name NodePath.prototype.baseTypeStrictlyMatches
 */

export function baseTypeStrictlyMatches(right: NodePath) {
  let left = this.getTypeAnnotation();
  right = right.getTypeAnnotation();

  if (!t.isAnyTypeAnnotation(left) && t.isFlowBaseAnnotation(left)) {
    return right.type === left.type;
  }
}

/**
 * [Needs description]
 * @public
 * @name NodePath.prototype.isGenericType
 */

export function isGenericType(genericName: string): boolean {
  let type = this.getTypeAnnotation();
  return t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, { name: genericName });
}
