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
  createFlowUnionType,
  createTSUnionType,
  createUnionTypeAnnotation,
  genericTypeAnnotation,
  identifier,
  isTSTypeAnnotation,
  nullLiteralTypeAnnotation,
  numberTypeAnnotation,
  stringTypeAnnotation,
  tupleTypeAnnotation,
  unionTypeAnnotation,
  voidTypeAnnotation,
} from "@babel/types";

export { default as Identifier } from "./inferer-reference";

export function VariableDeclarator() {
  const id = this.get("id");

  if (!id.isIdentifier()) return;
  const init = this.get("init");

  let type = init.getTypeAnnotation();

  if (type?.type === "AnyTypeAnnotation") {
    // Detect "var foo = Array()" calls so we can optimize for arrays vs iterables.
    if (
      init.isCallExpression() &&
      init.get("callee").isIdentifier({ name: "Array" }) &&
      !init.scope.hasBinding("Array", true /* noGlobals */)
    ) {
      type = ArrayExpression();
    }
  }

  return type;
}

export function TypeCastExpression(node) {
  return node.typeAnnotation;
}

TypeCastExpression.validParent = true;

export function NewExpression(node) {
  if (this.get("callee").isIdentifier()) {
    // only resolve identifier callee
    return genericTypeAnnotation(node.callee);
  }
}

export function TemplateLiteral() {
  return stringTypeAnnotation();
}

export function UnaryExpression(node) {
  const operator = node.operator;

  if (operator === "void") {
    return voidTypeAnnotation();
  } else if (NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return numberTypeAnnotation();
  } else if (STRING_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return stringTypeAnnotation();
  } else if (BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return booleanTypeAnnotation();
  }
}

export function BinaryExpression(node) {
  const operator = node.operator;

  if (NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return numberTypeAnnotation();
  } else if (BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
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

export function LogicalExpression() {
  const argumentTypes = [
    this.get("left").getTypeAnnotation(),
    this.get("right").getTypeAnnotation(),
  ];

  if (isTSTypeAnnotation(argumentTypes[0]) && createTSUnionType) {
    return createTSUnionType(argumentTypes);
  }

  if (createFlowUnionType) {
    return createFlowUnionType(argumentTypes);
  }

  return createUnionTypeAnnotation(argumentTypes);
}

export function ConditionalExpression() {
  const argumentTypes = [
    this.get("consequent").getTypeAnnotation(),
    this.get("alternate").getTypeAnnotation(),
  ];

  if (isTSTypeAnnotation(argumentTypes[0]) && createTSUnionType) {
    return createTSUnionType(argumentTypes);
  }

  if (createFlowUnionType) {
    return createFlowUnionType(argumentTypes);
  }

  return createUnionTypeAnnotation(argumentTypes);
}

export function SequenceExpression() {
  return this.get("expressions").pop().getTypeAnnotation();
}

export function ParenthesizedExpression() {
  return this.get("expression").getTypeAnnotation();
}

export function AssignmentExpression() {
  return this.get("right").getTypeAnnotation();
}

export function UpdateExpression(node) {
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
export function CallExpression() {
  const { callee } = this.node;
  if (isObjectKeys(callee)) {
    return arrayTypeAnnotation(stringTypeAnnotation());
  } else if (isArrayFrom(callee) || isObjectValues(callee)) {
    return arrayTypeAnnotation(anyTypeAnnotation());
  } else if (isObjectEntries(callee)) {
    return arrayTypeAnnotation(
      tupleTypeAnnotation([stringTypeAnnotation(), anyTypeAnnotation()]),
    );
  }

  return resolveCall(this.get("callee"));
}

export function TaggedTemplateExpression() {
  return resolveCall(this.get("tag"));
}

function resolveCall(callee) {
  callee = callee.resolve();

  if (callee.isFunction()) {
    if (callee.is("async")) {
      if (callee.is("generator")) {
        return genericTypeAnnotation(identifier("AsyncIterator"));
      } else {
        return genericTypeAnnotation(identifier("Promise"));
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
