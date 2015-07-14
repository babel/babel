import * as t from "../../../types";

export { default as Identifier } from "./inferer-reference";

/**
 * [Please add a description.]
 */

export function VariableDeclarator() {
  var id = this.get("id");

  if (id.isIdentifier()) {
    return this.get("init").getTypeAnnotation();
  } else {
    return;
  }
}

/**
 * [Please add a description.]
 */

export function TypeCastExpression(node) {
  return node.typeAnnotation;
}

TypeCastExpression.validParent = true;

/**
 * [Please add a description.]
 */

export function NewExpression(node) {
  if (this.get("callee").isIdentifier()) {
    // only resolve identifier callee
    return t.genericTypeAnnotation(node.callee);
  }
}

/**
 * [Please add a description.]
 */

export function TemplateLiteral() {
  return t.stringTypeAnnotation();
}

/**
 * [Please add a description.]
 */

export function UnaryExpression(node) {
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

/**
 * [Please add a description.]
 */

export function BinaryExpression(node) {
  let operator = node.operator;

  if (t.NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t.numberTypeAnnotation();
  } else if (t.BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t.booleanTypeAnnotation();
  } else if (operator === "+") {
    var right = this.get("right");
    var left  = this.get("left");

    if (left.isBaseType("number") && right.isBaseType("number")) {
      // both numbers so this will be a number
      return t.numberTypeAnnotation();
    } else if (left.isBaseType("string") || right.isBaseType("string")) {
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

/**
 * [Please add a description.]
 */

export function LogicalExpression() {
  return t.createUnionTypeAnnotation([
    this.get("left").getTypeAnnotation(),
    this.get("right").getTypeAnnotation()
  ]);
}

/**
 * [Please add a description.]
 */

export function ConditionalExpression() {
  return t.createUnionTypeAnnotation([
    this.get("consequent").getTypeAnnotation(),
    this.get("alternate").getTypeAnnotation()
  ]);
}

/**
 * [Please add a description.]
 */

export function SequenceExpression(node) {
  return this.get("expressions").pop().getTypeAnnotation();
}

/**
 * [Please add a description.]
 */

export function AssignmentExpression(node) {
  return this.get("right").getTypeAnnotation();
}

/**
 * [Please add a description.]
 */

export function UpdateExpression(node) {
  let operator = node.operator;
  if (operator === "++" || operator === "--") {
    return t.numberTypeAnnotation();
  }
}

/**
 * [Please add a description.]
 */

export function Literal(node) {
  var value = node.value;
  if (typeof value === "string") return t.stringTypeAnnotation();
  if (typeof value === "number") return t.numberTypeAnnotation();
  if (typeof value === "boolean") return t.booleanTypeAnnotation();
  if (value === null) return t.voidTypeAnnotation();
  if (node.regex) return t.genericTypeAnnotation(t.identifier("RegExp"));
}

/**
 * [Please add a description.]
 */

export function ObjectExpression() {
  return t.genericTypeAnnotation(t.identifier("Object"));
}

/**
 * [Please add a description.]
 */

export function ArrayExpression() {
  return t.genericTypeAnnotation(t.identifier("Array"));
}

/**
 * [Please add a description.]
 */

export function RestElement() {
  return ArrayExpression();
}

RestElement.validParent = true;

/**
 * [Please add a description.]
 */

function Func() {
  return t.genericTypeAnnotation(t.identifier("Function"));
}

export { Func as Function, Func as Class };

/**
 * [Please add a description.]
 */

export function CallExpression() {
  return resolveCall(this.get("callee"));
}

/**
 * [Please add a description.]
 */

export function TaggedTemplateExpression() {
  return resolveCall(this.get("tag"));
}

/**
 * [Please add a description.]
 */

function resolveCall(callee) {
  callee = callee.resolve();

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
