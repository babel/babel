import * as t from "@babel/types";

export function _params(node: Object) {
  this.print(node.typeParameters, node);
  this.token("(");
  this._parameters(node.params, node);
  this.token(")");

  this.print(node.returnType, node);
}

export function _parameters(parameters, parent) {
  for (let i = 0; i < parameters.length; i++) {
    this._param(parameters[i], parent);

    if (i < parameters.length - 1) {
      this.token(",");
      this.space();
    }
  }
}

export function _param(parameter, parent) {
  this.printJoin(parameter.decorators, parameter);
  this.print(parameter, parent);
  if (parameter.optional) this.token("?"); // TS / flow
  this.print(parameter.typeAnnotation, parameter); // TS / flow
}

export function _methodHead(node: Object) {
  const kind = node.kind;
  const key = node.key;

  if (kind === "get" || kind === "set") {
    this.word(kind);
    this.space();
  }

  if (node.async) {
    this.word("async");
    this.space();
  }

  if (kind === "method" || kind === "init") {
    if (node.generator) {
      this.token("*");
    }
  }

  if (node.computed) {
    this.token("[");
    this.print(key, node);
    this.token("]");
  } else {
    this.print(key, node);
  }

  if (node.optional) {
    // TS
    this.token("?");
  }

  this._params(node);
}

export function _predicate(node: Object) {
  if (node.predicate) {
    if (!node.returnType) {
      this.token(":");
    }
    this.space();
    this.print(node.predicate, node);
  }
}

export function _functionHead(node: Object) {
  if (node.async) {
    this.word("async");
    this.space();
  }
  this.word("function");
  if (node.generator) this.token("*");

  this.space();
  if (node.id) {
    this.print(node.id, node);
  }

  this._params(node);
  this._predicate(node);
}

export function FunctionExpression(node: Object) {
  this._functionHead(node);
  this.space();
  this.print(node.body, node);
}

export { FunctionExpression as FunctionDeclaration };

export function ArrowFunctionExpression(node: Object) {
  if (node.async) {
    this.word("async");
    this.space();
  }

  const firstParam = node.params[0];

  if (
    node.params.length === 1 &&
    t.isIdentifier(firstParam) &&
    !hasTypes(node, firstParam)
  ) {
    if (
      this.format.retainLines &&
      node.loc &&
      node.body.loc &&
      node.loc.start.line < node.body.loc.start.line
    ) {
      this.token("(");
      if (firstParam.loc && firstParam.loc.start.line > node.loc.start.line) {
        this.indent();
        this.print(firstParam, node);
        this.dedent();
        this._catchUp("start", node.body.loc);
      } else {
        this.print(firstParam, node);
      }
      this.token(")");
    } else {
      this.print(firstParam, node);
    }
  } else {
    this._params(node);
  }

  this._predicate(node);

  this.space();
  this.token("=>");
  this.space();

  this.print(node.body, node);
}

function hasTypes(node, param) {
  return (
    node.typeParameters ||
    node.returnType ||
    param.typeAnnotation ||
    param.optional ||
    param.trailingComments
  );
}
