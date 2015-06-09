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
  } else if (this.isTypeCastExpression()) {
    return this.get("expression").resolve(dangerous, resolved);
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
 */

export function getTypeAnnotation(force) {
  if (this.typeAnnotation) return this.typeAnnotation;

  var type = this._getTypeAnnotation(force) || t.anyTypeAnnotation();
  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
  return this.typeAnnotation = type;
}

export function _getTypeAnnotationBindingConstantViolations(path, name) {
  var binding = this.scope.getBinding(name);

  var types = [];
  this.typeAnnotation = t.unionTypeAnnotation(types);

  var functionConstantViolations = [];
  var constantViolations = getConstantViolationsBefore(binding, path, functionConstantViolations);

  var testType = getTypeAnnotationBasedOnConditional(path, name);
  if (testType) {
    var testConstantViolations = getConstantViolationsBefore(binding, testType.ifStatement);

    // remove constant violations observed before the IfStatement
    constantViolations = constantViolations.filter((path) => testConstantViolations.indexOf(path) < 0);

    // clear current types and add in observed test type
    types.push(testType.typeAnnotation);
  }

  if (constantViolations.length) {
    // pick one constant from each scope which will represent the last possible
    // control flow path that it could've taken/been
    var rawConstantViolations = constantViolations.reverse();
    var visitedScopes = [];
    constantViolations = [];
    for (let violation of (rawConstantViolations: Array)) {
      if (visitedScopes.indexOf(violation.scope) >= 0) continue;
      visitedScopes.push(violation.scope);
      constantViolations.push(violation);
    }

    // add back on function constant violations since we can't track calls
    constantViolations = constantViolations.concat(functionConstantViolations);

    // push on inferred types of violated paths
    for (let violation of (constantViolations: Array)) {
      types.push(violation.getTypeAnnotation());
    }
  }

  if (types.length) {
    return t.createUnionTypeAnnotation(types);
  }
}

function getConstantViolationsBefore(binding, path, functions) {
  var violations = binding.constantViolations.slice();
  violations.unshift(binding.path);
  return violations.filter((violation) => {
    violation = violation.resolve();
    var status = violation._guessExecutionStatusRelativeTo(path);
    if (functions && status === "function") functions.push(violation);
    return status === "before";
  });
}

function checkBinary(name, path) {
  var right = path.get("right").resolve();
  var left  = path.get("left").resolve();

  if (left.isIdentifier({ name })) {
    return right.getTypeAnnotation();
  } else if (right.isIdentifier({ name })) {
    return left.getTypeAnnotation();
  }

  //
  var typeofPath;
  var typePath;
  if (left.isUnaryExpression({ operator: "typeof" })) {
    typeofPath = left;
    typePath = right;
  } else if (right.isUnaryExpression({ operator: "typeof" })) {
    typeofPath = right;
    typePath = left;
  }
  if (!typePath && !typeofPath) return;

  // ensure that the type path is a Literal
  typePath = typePath.resolve();
  if (!typePath.isLiteral()) return;

  // and that it's a string so we can infer it
  var typeValue = typePath.node.value;
  if (typeof typeValue !== "string") return;

  // and that the argument of the typeof path references us!
  if (!typeofPath.get("argument").isIdentifier({ name })) return;

  // turn type value into a type annotation
  var value = typePath.node.value;
  if (value === "string") {
    return t.stringTypeAnnotation();
  } else if (value === "number") {
    return t.numberTypeAnnotation();
  } else if (value === "undefined") {
    return t.voidTypeAnnotation();
  } else if (value === "boolean") {
    return t.booleanTypeAnnotation();
  } else if (value === "function") {
    // todo
  } else if (value === "object") {
    // todo
  }
}

function getParentConditional(path) {
  var parentPath;
  while (parentPath = path.parentPath) {
    if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
      if (path.key === "test") {
        return;
      } else {
        return parentPath;
      }
    } else {
      path = parentPath;
    }
  }
}

function getTypeAnnotationBasedOnConditional(path, name) {
  var ifStatement = getParentConditional(path);
  if (!ifStatement) return;

  var test  = ifStatement.get("test");
  var paths = [test];
  var types = [];

  do {
    let path = paths.shift().resolve();

    if (path.isLogicalExpression()) {
      paths.push(path.get("left"));
      paths.push(path.get("right"));
    }

    if (path.isBinaryExpression({ operator: "===" })) {
      // todo: add in cases where operators imply a number
      var type = checkBinary(name, path);
      if (type) types.push(type);
    }
  } while(paths.length);

  if (types.length) {
    return {
      typeAnnotation: t.createUnionTypeAnnotation(types),
      ifStatement
    };
  } else {
    return getTypeAnnotationBasedOnConditional(ifStatement, name);
  }
}

/**
 * todo: split up this method
 */

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
      return this.get("init").getTypeAnnotation();
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
    return t.genericTypeAnnotation(t.identifier("Array"));
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
        return this._getTypeAnnotationBindingConstantViolations(this, node.name);
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
    if (value === null) return t.voidTypeAnnotation();
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
