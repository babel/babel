import isBoolean from "lodash/lang/isBoolean";
import isNumber from "lodash/lang/isNumber";
import isString from "lodash/lang/isString";
import * as t from "../../types";

/**
 * Description
 */

export function getTypeAnnotation(): {
  inferred: boolean;
  annotation: ?Object;
} {
  if (this.typeInfo) {
    return this.typeInfo;
  }

  var info = this.typeInfo = {
    inferred: false,
    annotation: null
  };

  var type = this.node && this.node.typeAnnotation;

  if (!type) {
    info.inferred = true;
    type = this.inferType(this);
  }

  if (type) {
    if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
    info.annotation = type;
  }

  return info;
}

/**
 * Description
 */

export function resolve(resolved?): ?NodePath {
  // detect infinite recursion
  if (resolved && resolved.indexOf(this) >= 0) return;

  // we store all the paths we've "resolved" in this array to prevent infinite recursion
  resolved = resolved || [];
  resolved.push(this);

  if (this.isVariableDeclarator()) {
    if (this.get("id").isIdentifier()) {
      return this.get("init").resolve(resolved);
    } else {
      // otherwise it's a request for a pattern and that's a bit more tricky
    }
  } else if (this.isIdentifier()) {
    var binding = this.scope.getBinding(this.node.name);
    if (!binding || !binding.constant) return;

    if (binding.path === this) {
      return this;
    } else {
      return binding.path.resolve(resolved);
    }
  } else if (this.isMemberExpression()) {
    // this is dangerous, as non-direct target assignments will mutate it's state
    // making this resolution inaccurate

    var targetKey = this.toComputedKey();
    if (!t.isLiteral(targetKey)) return;
    var targetName = targetKey.value;

    var target = this.get("object").resolve(resolved);
    if (!target || !target.isObjectExpression()) return;

    var props = target.get("properties");
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      if (!prop.isProperty()) continue;

      var key = prop.get("key");

      // { foo: obj }
      var match = prop.isnt("computed") && key.isIdentifier({ name: targetName });

      // { "foo": "obj" } or { ["foo"]: "obj" }
      match = match || key.isLiteral({ value: targetName });

      if (match) return prop.get("value");
    }
  } else {
    return this;
  }
}

/**
 * Description
 */

export function inferType(path: NodePath): ?Object {
  path = path.resolve();
  if (!path) return;

  if (path.isType("RestElement") || path.parentPath.isType("RestElement") || path.isType("ArrayExpression")) {
    return t.genericTypeAnnotation(t.identifier("Array"));
  }

  if (path.parentPath.isType("TypeCastExpression")) {
    return path.parentPath.node.typeAnnotation;
  }

  if (path.isType("TypeCastExpression")) {
    return path.node.typeAnnotation;
  }

  if (path.isType("ObjectExpression")) {
    return t.genericTypeAnnotation(t.identifier("Object"));
  }

  if (path.isType("Function")) {
    return t.identifier("Function");
  }

  if (path.isType("Literal")) {
    var value = path.node.value;
    if (isString(value)) return t.stringTypeAnnotation();
    if (isNumber(value)) return t.numberTypeAnnotation();
    if (isBoolean(value)) return t.booleanTypeAnnotation();
  }

  if (path.isType("CallExpression")) {
    var callee = path.get("callee").resolve();
    if (callee && callee.isType("Function")) return callee.node.returnType;
  }
}

/**
 * Description
 */

export function isTypeGeneric(genericName: string, opts = {}): boolean {
  var typeInfo = this.getTypeAnnotation();
  var type     = typeInfo.annotation;
  if (!type) return false;

  if (typeInfo.inferred && opts.inference === false) {
    return false;
  }

  if (!t.isGenericTypeAnnotation(type) || !t.isIdentifier(type.id, { name: genericName })) {
    return false;
  }

  if (opts.requireTypeParameters && !type.typeParameters) {
    return false;
  }

  return true;
}
