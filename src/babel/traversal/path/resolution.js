import type NodePath from "./index";
import * as t from "../../types";

/**
 * Resolve a "pointer" `NodePath` to it's absolute path.
 */

export function resolve(dangerous, resolved) {
  return this._resolve(dangerous, resolved) || this;
}

export function _resolve(dangerous?, resolved?): ?NodePath {
  // detect infinite recursion
  // todo: possibly have a max length on this just to be safe
  if (resolved && resolved.indexOf(this) >= 0) return;

  // we store all the paths we've "resolved" in this array to prevent infinite recursion
  resolved = resolved || [];
  resolved.push(this);

  if (this.isVariableDeclarator()) {
    if (this.get("id").isIdentifier()) {
      return this.get("init").resolve(dangerous, resolved);
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

    if (binding.path !== this) {
      return binding.path.resolve(dangerous, resolved);
    }
  } else if (dangerous && this.isMemberExpression()) {
    // this is dangerous, as non-direct target assignments will mutate it's state
    // making this resolution inaccurate

    var targetKey = this.toComputedKey();
    if (!t.isLiteral(targetKey)) return;

    var targetName = targetKey.value;

    var target = this.get("object").resolve(dangerous, resolved);

    if (target.isObjectExpression()) {
      var props = target.get("properties");
      for (var prop of (props: Array)) {
        if (!prop.isProperty()) continue;

        var key = prop.get("key");

        // { foo: obj }
        var match = prop.isnt("computed") && key.isIdentifier({ name: targetName });

        // { "foo": "obj" } or { ["foo"]: "obj" }
        match = match || key.isLiteral({ value: targetName });

        if (match) return prop.get("value").resolve(dangerous, resolved);
      }
    } else if (target.isArrayExpression() && !isNaN(+targetName)) {
      var elems = target.get("elements");
      var elem = elems[targetName];
      if (elem) return elem.resolve(dangerous, resolved);
    }
  }
}


/**
 * Infer the type of the current `NodePath`.
 *
 * NOTE: This is not cached. Use `getTypeAnnotation()` which is cached.
 */

export function getTypeAnnotation(force) {
  if (this.typeAnnotation) return this.typeAnnotation;

  var type = this._getTypeAnnotation(force) || t.anyTypeAnnotation();
  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
  return this.typeAnnotation = type;
}

export function _getTypeAnnotationBindingConstantViolations(name, types = []) {
  var binding = this.scope.getBinding(name);

  for (var constantViolation of (binding.constantViolations: Array)) {
    types.push(constantViolation.getTypeAnnotation());
  }

  if (types.length) {
    return t.createUnionTypeAnnotation(types);
  }
}

export function _getTypeAnnotation(force?: boolean): ?Object {
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

  //
  if (this.isVariableDeclarator()) {
    var id = this.get("id");

    if (id.isIdentifier()) {
      return this._getTypeAnnotationBindingConstantViolations(id.node.name, [
        this.get("init").getTypeAnnotation()
      ]);
    } else {
      return;
    }
  }

  //
  if (this.parentPath.isTypeCastExpression()) {
    return this.parentPath.getTypeAnnotation();
  }

  if (this.isTypeCastExpression()) {
    return node.typeAnnotation;
  }

  //
  if (this.isRestElement() || this.parentPath.isRestElement() || this.isArrayExpression()) {
    return t.genericTypeAnnotation(t.identifier("Array"), t.typeParameterInstantiation([t.anyTypeAnnotation()]));
  }

  //
  if (!force && this.parentPath.isReturnStatement()) {
    return this.parentPath.getTypeAnnotation();
  }

  if (this.isReturnStatement()) {
    var funcPath = this.findParent((path) => path.isFunction());
    if (!funcPath) return;

    var returnType = funcPath.node.returnType;
    if (returnType) {
      return returnType;
    } else {
      return this.get("argument").getTypeAnnotation(true);
    }
  }

  //
  if (this.isNewExpression() && this.get("callee").isIdentifier()) {
    // only resolve identifier callee
    return t.genericTypeAnnotation(node.callee);
  }

  //
  if (this.isReferencedIdentifier()) {
    // check if a binding exists of this value and if so then return a union type of all
    // possible types that the binding could be
    var binding = this.scope.getBinding(node.name);
    if (binding) {
      if (binding.identifier.typeAnnotation) {
        return binding.identifier.typeAnnotation;
      } else {
        return this._getTypeAnnotationBindingConstantViolations(node.name, [
          binding.path.getTypeAnnotation()
        ]);
      }
    }

    // built-in values
    if (node.name === "undefined") {
      return t.voidTypeAnnotation();
    } else if (node.name === "NaN" || node.name === "Infinity") {
      return t.numberTypeAnnotation();
    } else if (node.name === "arguments") {
      // todo
    }
  }

  //
  if (this.isObjectExpression()) {
    return t.genericTypeAnnotation(t.identifier("Object"));
  }

  //
  if (this.isFunction() || this.isClass()) {
    return t.genericTypeAnnotation(t.identifier("Function"));
  }

  //
  if (this.isTemplateLiteral()) {
    return t.stringTypeAnnotation();
  }

  //
  if (this.isUnaryExpression()) {
    let operator = node.operator;

    if (operator === "void") {
      return t.voidTypeAnnotation();
    } else if (t.NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) {
      return t.numberTypeAnnotation();
    } else if (t.STRING_UNARY_OPERATORS.indexOf(operator) >= 0) {
      return t.stringTypeAnnotation();
    } else if (t.BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) {
      return t.booleanTypeAnnotation();
    }
  }

  //
  if (this.isBinaryExpression()) {
    let operator = node.operator;

    if (t.NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
      return t.numberTypeAnnotation();
    } else if (t.BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
      return t.booleanTypeAnnotation();
    } else if (operator === "+") {
      var right = this.get("right");
      var left  = this.get("left");

      if (left.isGenericType("Number") && right.isGenericType("Number")) {
        // both numbers so this will be a number
        return t.numberTypeAnnotation();
      } else if (left.isGenericType("String") || right.isGenericType("String")) {
        // one is a string so the result will be a string
        return t.stringTypeAnnotation();
      }

      // unsure if left and right are strings or numbers so stay on the safe side
      return t.unionTypeAnnotation([
        t.stringTypeAnnotation(),
        t.numberTypeAnnotation()
      ]);
    }
  }

  //
  if (this.isLogicalExpression()) {
    return t.createUnionTypeAnnotation([
      this.get("left").getTypeAnnotation(),
      this.get("right").getTypeAnnotation()
    ]);
  }

  //
  if (this.isConditionalExpression()) {
    return t.createUnionTypeAnnotation([
      this.get("consequent").getTypeAnnotation(),
      this.get("alternate").getTypeAnnotation()
    ]);
  }

  //
  if (this.isSequenceExpression()) {
    return this.get("expressions").pop().getTypeAnnotation(force);
  }

  //
  if (this.isAssignmentExpression()) {
    return this.get("right").getTypeAnnotation(force);
  }

  //
  if (this.isUpdateExpression()) {
    let operator = node.operator;
    if (operator === "++" || operator === "--") {
      return t.numberTypeAnnotation();
    }
  }

  //
  if (this.isLiteral()) {
    var value = node.value;
    if (typeof value === "string") return t.stringTypeAnnotation();
    if (typeof value === "number") return t.numberTypeAnnotation();
    if (typeof value === "boolean") return t.booleanTypeAnnotation();
    if (node.regex) return t.genericTypeAnnotation(t.identifier("RegExp"));
  }

  //
  var callPath;
  if (this.isCallExpression()) callPath = this.get("callee");
  if (this.isTaggedTemplateExpression()) callPath = this.get("tag");
  if (callPath) {
    var callee = callPath.resolve();
    // todo: read typescript/flow interfaces

    if (callee.isFunction()) {
      if (callee.is("async")) {
        if (callee.is("generator")) {
          return t.genericTypeAnnotation(t.identifier("AsyncIterator"));
        } else {
          return t.genericTypeAnnotation(t.identifier("Promise"));
        }
      } else {
        if (callee.node.returnType) {
          return callee.node.returnType;
        } else {
          // todo: get union type of all return arguments
        }
      }
    }
  }
}

/**
 * Description
 */

export function isGenericType(genericName: string): boolean {
  var type = this.getTypeAnnotation();

  if (t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, { name: genericName })) {
    return true;
  }

  if (genericName === "String") {
    return t.isStringTypeAnnotation(type);
  } else if (genericName === "Number") {
    return t.isNumberTypeAnnotation(type);
  } else if (genericName === "Boolean") {
    return t.isBooleanTypeAnnotation(type);
  }

  return false;
}
