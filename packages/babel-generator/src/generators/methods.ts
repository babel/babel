import type Printer from "../printer";
import { isIdentifier } from "@babel/types";
import type * as t from "@babel/types";

export function _params(
  this: Printer,
  node: t.Function | t.TSDeclareMethod | t.TSDeclareFunction,
) {
  this.print(node.typeParameters, node);
  this.token("(");
  this._parameters(node.params, node);
  this.token(")");

  this.print(node.returnType, node, node.type === "ArrowFunctionExpression");
}

export function _parameters(
  this: Printer,
  parameters: t.Function["params"],
  parent:
    | t.Function
    | t.TSIndexSignature
    | t.TSDeclareMethod
    | t.TSDeclareFunction
    | t.TSFunctionType
    | t.TSConstructorType,
) {
  const paramLength = parameters.length;
  for (let i = 0; i < paramLength; i++) {
    this._param(parameters[i], parent);

    if (i < parameters.length - 1) {
      this.token(",");
      this.space();
    }
  }
  if (paramLength === 0) {
    this.printInnerComments(parent);
  }
}

export function _param(
  this: Printer,
  parameter: t.Identifier | t.RestElement | t.Pattern | t.TSParameterProperty,
  parent?:
    | t.Function
    | t.TSIndexSignature
    | t.TSDeclareMethod
    | t.TSDeclareFunction
    | t.TSFunctionType
    | t.TSConstructorType,
) {
  this.printJoin(parameter.decorators, parameter);
  this.print(parameter, parent);
  if (
    // @ts-expect-error optional is not in TSParameterProperty
    parameter.optional
  ) {
    this.token("?"); // TS / flow
  }

  this.print(
    // @ts-expect-error typeAnnotation is not in TSParameterProperty
    parameter.typeAnnotation,
    parameter,
  ); // TS / flow
}

export function _methodHead(this: Printer, node: t.Method | t.TSDeclareMethod) {
  const kind = node.kind;
  const key = node.key;

  if (kind === "get" || kind === "set") {
    this.word(kind);
    this.space();
  }

  const { _noLineTerminator } = this;
  if (node.async) {
    // ensure no line terminator between async and class element name / *
    this._noLineTerminator = true;
    this.word("async");
    this.space();
  }

  if (
    kind === "method" ||
    // @ts-expect-error Fixme: kind: "init" is not defined
    kind === "init"
  ) {
    if (node.generator) {
      if (node.async) {
        this.printInnerComments(node);
      }
      this.token("*");
      this._noLineTerminator = _noLineTerminator;
    }
  }

  if (node.computed) {
    this.token("[");
    this._noLineTerminator = _noLineTerminator;
    this.print(key, node);
    this.token("]");
    this.printInnerComments(node);
  } else {
    this.print(key, node);
    this._noLineTerminator = _noLineTerminator;
  }

  if (
    // @ts-expect-error optional is not in ObjectMethod
    node.optional
  ) {
    // TS
    this.token("?");
  }

  this._params(node);
}

export function _predicate(
  this: Printer,
  node:
    | t.FunctionDeclaration
    | t.FunctionExpression
    | t.ArrowFunctionExpression,
) {
  if (node.predicate) {
    if (!node.returnType) {
      this.token(":");
    }
    this.space();
    this.print(node.predicate, node);
  }
}

export function _functionHead(
  this: Printer,
  node: t.FunctionDeclaration | t.FunctionExpression | t.TSDeclareFunction,
) {
  if (node.async) {
    this.word("async");
    this.space();
  }
  this.word("function");
  if (node.generator) this.token("*");
  this.printInnerComments(node);

  this.space();
  if (node.id) {
    this.print(node.id, node);
  }

  this._params(node);
  if (node.type !== "TSDeclareFunction") {
    this._predicate(node);
  }
}

export function FunctionExpression(this: Printer, node: t.FunctionExpression) {
  this._functionHead(node);
  this.space();
  this.print(node.body, node);
}

export { FunctionExpression as FunctionDeclaration };

export function ArrowFunctionExpression(
  this: Printer,
  node: t.ArrowFunctionExpression,
) {
  const { _noLineTerminator } = this;
  if (node.async) {
    this._noLineTerminator = true;
    this.word("async");
    this.space();
  }

  // Try to avoid printing parens in simple cases, but only if we're pretty
  // sure that they aren't needed by type annotations or potential newlines.
  let firstParam;
  if (
    !this.format.retainLines &&
    node.params.length === 1 &&
    isIdentifier((firstParam = node.params[0])) &&
    !hasTypesOrComments(node, firstParam)
  ) {
    this.print(firstParam, node);
    this._noLineTerminator = _noLineTerminator;
  } else {
    this._noLineTerminator = _noLineTerminator;
    this._params(node);
  }

  this._predicate(node);
  this.ensureNoLineTerminator(() => {
    this.space();
    this.printInnerComments(node);
    this.token("=>");
  });

  this.space();

  this.print(node.body, node);
}

function hasTypesOrComments(
  node: t.ArrowFunctionExpression,
  param: t.Identifier,
): boolean {
  return !!(
    node.typeParameters ||
    node.returnType ||
    node.predicate ||
    param.typeAnnotation ||
    param.optional ||
    // Flow does not support `foo /*: string*/ => {};`
    param.leadingComments?.length ||
    param.trailingComments?.length
  );
}
