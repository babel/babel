import * as inferers from "./inferers";
import * as t from "../../../types";

/**
 * Infer the type of the current `NodePath`.
 */

export function getTypeAnnotation() {
  if (this.typeAnnotation) return this.typeAnnotation;

  var type = this._getTypeAnnotation() || t.anyTypeAnnotation();
  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
  return this.typeAnnotation = type;
}

/**
 * todo: split up this method
 */

export function _getTypeAnnotation(): ?Object {
  var node = this.node;

  if (!node) {
    // handle initializerless variables, add in checks for loop initializers too
    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
      var declar       = this.parentPath.parentPath;
      var declarParent = declar.parentPath;

      // for (var NODE in bar) {}
      if (declar.key === "left" && declarParent.isForInStatement()) {
        return t.stringTypeAnnotation();
      }

      // for (var NODE of bar) {}
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

  var inferer = inferers[node.type];
  if (inferer) {
    return inferer.call(this, node);
  }

  inferer = inferer[this.parentPath.type];
  if (inferer && inferer.validParent) {
    return this.parentPath.getTypeAnnotation();
  }
}

/**
 * Description
 */

export function isBaseType(baseName: string): boolean {
  var type = this.getTypeAnnotation();

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
  } else {
    throw new Error(`Unknown base type ${baseName}`);
  }
}

/**
 * Description
 */

export function isGenericType(genericName: string): boolean {
  var type = this.getTypeAnnotation();
  return t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, { name: genericName });
}
