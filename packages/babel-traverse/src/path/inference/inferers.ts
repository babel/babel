import {
  BOOLEAN_BINARY_OPERATORS,
  BOOLEAN_UNARY_OPERATORS,
  NUMBER_BINARY_OPERATORS,
  NUMBER_UNARY_OPERATORS,
  STRING_UNARY_OPERATORS,
  anyTypeAnnotation,
  arrayTypeAnnotation,
  booleanTypeAnnotation,
  buildMatchMemberExpression,
  genericTypeAnnotation,
  identifier,
  nullLiteralTypeAnnotation,
  numberTypeAnnotation,
  stringTypeAnnotation,
  tupleTypeAnnotation,
  unionTypeAnnotation,
  voidTypeAnnotation,
  isIdentifier,
} from "@babel/types";
import type * as t from "@babel/types";

export { default as Identifier } from "./inferer-reference.ts";

import { createUnionType } from "./util.ts";
import type NodePath from "../index.ts";

export function VariableDeclarator(this: NodePath<t.VariableDeclarator>) {
  if (!this.get("id").isIdentifier()) return;
  return this.get("init").getTypeAnnotation();
}

export function TypeCastExpression(node: t.TypeCastExpression) {
  return node.typeAnnotation;
}

TypeCastExpression.validParent = true;

export function TSAsExpression(node: t.TSAsExpression) {
  return node.typeAnnotation;
}

TSAsExpression.validParent = true;

export function TSNonNullExpression(this: NodePath<t.TSNonNullExpression>) {
  return this.get("expression").getTypeAnnotation();
}

export function NewExpression(
  this: NodePath<t.NewExpression>,
  node: t.NewExpression,
) {
  if (node.callee.type === "Identifier") {
    // only resolve identifier callee
    return genericTypeAnnotation(node.callee);
  }
}

export function TemplateLiteral() {
  return stringTypeAnnotation();
}

export function UnaryExpression(node: t.UnaryExpression) {
  const operator = node.operator;

  if (operator === "void") {
    return voidTypeAnnotation();
  } else if (NUMBER_UNARY_OPERATORS.includes(operator)) {
    return numberTypeAnnotation();
  } else if (STRING_UNARY_OPERATORS.includes(operator)) {
    return stringTypeAnnotation();
  } else if (BOOLEAN_UNARY_OPERATORS.includes(operator)) {
    return booleanTypeAnnotation();
  }
}

export function BinaryExpression(
  this: NodePath<t.BinaryExpression>,
  node: t.BinaryExpression,
) {
  const operator = node.operator;

  if (NUMBER_BINARY_OPERATORS.includes(operator)) {
    return numberTypeAnnotation();
  } else if (BOOLEAN_BINARY_OPERATORS.includes(operator)) {
    return booleanTypeAnnotation();
  } else if (operator === "+") {
    const right = this.get("right");
    const left = this.get("left");

    if (left.isBaseType("number") && right.isBaseType("number")) {
      // both numbers so this will be a number
      return numberTypeAnnotation();
    } else if (left.isBaseType("string") || right.isBaseType("string")) {
      // one is a string so the result will be a string
      return stringTypeAnnotation();
    }

    // unsure if left and right are strings or numbers so stay on the safe side
    return unionTypeAnnotation([
      stringTypeAnnotation(),
      numberTypeAnnotation(),
    ]);
  }
}

export function LogicalExpression(this: NodePath<t.LogicalExpression>) {
  const argumentTypes = [
    this.get("left").getTypeAnnotation(),
    this.get("right").getTypeAnnotation(),
  ];

  return createUnionType(argumentTypes);
}

export function ConditionalExpression(this: NodePath<t.ConditionalExpression>) {
  const argumentTypes = [
    this.get("consequent").getTypeAnnotation(),
    this.get("alternate").getTypeAnnotation(),
  ];

  return createUnionType(argumentTypes);
}

export function SequenceExpression(this: NodePath<t.SequenceExpression>) {
  return this.get("expressions").pop().getTypeAnnotation();
}

export function ParenthesizedExpression(
  this: NodePath<t.ParenthesizedExpression>,
) {
  return this.get("expression").getTypeAnnotation();
}

export function AssignmentExpression(this: NodePath<t.AssignmentExpression>) {
  return this.get("right").getTypeAnnotation();
}

export function UpdateExpression(
  this: NodePath<t.UpdateExpression>,
  node: t.UpdateExpression,
) {
  const operator = node.operator;
  if (operator === "++" || operator === "--") {
    return numberTypeAnnotation();
  }
}

export function StringLiteral() {
  return stringTypeAnnotation();
}

export function NumericLiteral() {
  return numberTypeAnnotation();
}

export function BooleanLiteral() {
  return booleanTypeAnnotation();
}

export function NullLiteral() {
  return nullLiteralTypeAnnotation();
}

export function RegExpLiteral() {
  return genericTypeAnnotation(identifier("RegExp"));
}

export function ObjectExpression() {
  return genericTypeAnnotation(identifier("Object"));
}

export function ArrayExpression() {
  return genericTypeAnnotation(identifier("Array"));
}

export function RestElement() {
  return ArrayExpression();
}

RestElement.validParent = true;

function Func() {
  return genericTypeAnnotation(identifier("Function"));
}

export {
  Func as FunctionExpression,
  Func as ArrowFunctionExpression,
  Func as FunctionDeclaration,
  Func as ClassExpression,
  Func as ClassDeclaration,
};

const isArrayFrom = buildMatchMemberExpression("Array.from");
const isObjectKeys = buildMatchMemberExpression("Object.keys");
const isObjectValues = buildMatchMemberExpression("Object.values");
const isObjectEntries = buildMatchMemberExpression("Object.entries");
export function CallExpression(this: NodePath<t.CallExpression>) {
  const { callee } = this.node;
  if (isObjectKeys(callee)) {
    return arrayTypeAnnotation(stringTypeAnnotation());
  } else if (
    isArrayFrom(callee) ||
    isObjectValues(callee) ||
    // Detect "var foo = Array()" calls so we can optimize for arrays vs iterables.
    isIdentifier(callee, { name: "Array" })
  ) {
    return arrayTypeAnnotation(anyTypeAnnotation());
  } else if (isObjectEntries(callee)) {
    return arrayTypeAnnotation(
      tupleTypeAnnotation([stringTypeAnnotation(), anyTypeAnnotation()]),
    );
  }

  return resolveCall(this.get("callee"));
}

export function TaggedTemplateExpression(
  this: NodePath<t.TaggedTemplateExpression>,
) {
  return resolveCall(this.get("tag"));
}

function resolveCall(callee: NodePath) {
  callee = callee.resolve();

  if (callee.isFunction()) {
    const { node } = callee;
    if (node.async) {
      if (node.generator) {
        return genericTypeAnnotation(identifier("AsyncIterator"));
      } else {
        return genericTypeAnnotation(identifier("Promise"));
      }
    } else {
      if (node.generator) {
        return genericTypeAnnotation(identifier("Iterator"));
      } else if (callee.node.returnType) {
        return callee.node.returnType;
      } else {
        // todo: get union type of all return arguments
      }
    }
  }
}
