import * as t from "../../types";

const BOOLEAN_BINARY_OPERATORS = ["==", "===", "!=", "!==", ">", "<", ">=", "<=", "in"];
const NUMBER_BINARY_OPERATORS  = ["-", "/", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];

/**
 * Description
 */

export function getTypeAnnotation() {
  return this.getTypeAnnotationInfo().annotation;
}

/**
 * Description
 */

export function getTypeAnnotationInfo(): {
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
    type = this.inferTypeAnnotation();
  }

  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
  info.annotation = type;

  return info;
}

/**
 * Resolves `NodePath` pointers until it resolves to an absolute path. ie. a data type instead of a
 * call etc. If a data type can't be resolved then the last path we were at is returned.
 */

export function resolve(resolved?): ?NodePath {
  // detect infinite recursion
  // todo: possibly have a max length on this just to be safe
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
  } else if (this.isReferencedIdentifier()) {
    var binding = this.scope.getBinding(this.node.name);
    if (!binding) return;

    // reassigned so we can't really resolve it
    if (!binding.constant) return;

    // todo - lookup module in dependency graph
    if (binding.kind === "module") return;

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
 * Infer the type of the current `NodePath`.
 *
 * NOTE: This is not cached. Use `getTypeAnnotation()` which is cached.
 */

export function inferTypeAnnotation(force) {
  return this._inferTypeAnnotation(force) || t.anyTypeAnnotation();
}

export function _inferTypeAnnotation(force?: boolean): ?Object {
  var path = this.resolve();
  if (!path) return;

  if (path.isNodeType("RestElement") || path.parentPath.isNodeType("RestElement") || path.isNodeType("ArrayExpression")) {
    return t.genericTypeAnnotation(t.identifier("Array"));
  }

  if (path.parentPath.isNodeType("TypeCastExpression")) {
    return path.parentPath.inferTypeAnnotation();
  }

  if (path.isNodeType("TypeCastExpression")) {
    return path.node.typeAnnotation;
  }

  if (path.parentPath.isNodeType("ReturnStatement") && !force) {
    return path.parentPath.inferTypeAnnotation();
  }

  if (path.isNodeType("ReturnStatement")) {
    var funcPath = this.findParent((node, path) => path.isFunction());
    if (!funcPath) return;

    var returnType = funcPath.node.returnType;
    if (returnType) {
      return returnType;
    } else {
      return this.get("argument").inferTypeAnnotation(true);
    }
  }

  if (path.isNodeType("NewExpression")) {
    // todo
  }

  if (path.isNodeType("Identifier") && path.node.name === "undefined") {
    return t.voidTypeAnnotation();
  }

  if (path.isNodeType("ObjectExpression")) {
    return t.genericTypeAnnotation(t.identifier("Object"));
  }

  if (path.isNodeType("Function")) {
    return t.identifier("Function");
  }

  if (path.isNodeType("BinaryExpression")) {
    let operator = path.node.operator;
    if (NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
      // these operators always result in numbers
      return t.numberTypeAnnotation();
    } else if (BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
      return t.booleanTypeAnnotation();
    } else if (operator === "+") {
      var right = this.get("right");
      var left  = this.get("left");

      if (left.isTypeAnnotationGeneric("Number") && right.isTypeAnnotationGeneric("Number")) {
        // both numbers so this will be a number
        return t.numberTypeAnnotation();
      } else if (left.isTypeAnnotationGeneric("String") || right.isTypeAnnotationGeneric("String")) {
        // one is a string so the result will be a string
        return t.stringTypeAnnotation();
      } else {
        // unsure if left and right are both strings or numbers so stay on the safe side
        return t.unionTypeAnnotation([
          t.stringTypeAnnotation(),
          t.numberTypeAnnotation()
        ]);
      }
    }
  }

  if (path.isNodeType("LogicalExpression")) {
    // todo: create UnionType of left and right annotations
  }

  if (path.isNodeType("ConditionalExpression")) {
    // todo: create UnionType of consequent and alternate annotations
  }

  if (path.isNodeType("SequenceExpression")) {
    return this.get("expressions").pop().inferTypeAnnotation(force);
  }

  if (path.isNodeType("AssignmentExpression")) {
    return this.get("right").inferTypeAnnotation(force);
  }

  if (path.isNodeType("UpdateExpression")) {
    let operator = path.node.operator;
    if (operator === "++" || operator === "--") {
      return t.numberTypeAnnotation();
    }
  }

  if (path.isNodeType("UnaryExpression") && path.node.prefix) {
    let operator = path.node.operator;
    if (operator === "!") {
      return t.booleanTypeAnnotation();
    } else if (operator === "+" || operator === "-") {
      return t.numberTypeAnnotation();
    }
  }

  if (path.isNodeType("Literal")) {
    var value = path.node.value;
    if (typeof value === "string") return t.stringTypeAnnotation();
    if (typeof value === "number") return t.numberTypeAnnotation();
    if (typeof value === "boolean") return t.booleanTypeAnnotation();
    if (path.node.regex) return t.genericTypeAnnotation(t.identifier("RegExp"));
  }

  if (path.isNodeType("CallExpression")) {
    var callee = path.get("callee").resolve();
    if (callee && callee.isNodeType("Function")) return callee.node.returnType;
  }
}

/**
 * Description
 */

export function isTypeAnnotationGeneric(genericName: string, opts = {}): boolean {
  var typeInfo = this.getTypeAnnotationInfo();
  var type     = typeInfo.annotation;
  if (!type) return false;

  if (typeInfo.inferred && opts.inference === false) {
    return false;
  }

  if (genericName === "String") {
    return t.isStringTypeAnnotation(type);
  } else if (genericName === "Number") {
    return t.isNumberTypeAnnotation(type);
  } else if (genericName === "boolean") {
    return t.isBooleanTypeAnnotation(type);
  }

  if (!t.isGenericTypeAnnotation(type) || !t.isIdentifier(type.id, { name: genericName })) {
    return false;
  }

  if (opts.requireTypeParameters && !type.typeParameters) {
    return false;
  }

  return true;
}
