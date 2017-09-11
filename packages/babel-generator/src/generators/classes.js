import * as t from "babel-types";

export function ClassDeclaration(node: Object, parent: Object) {
  if (
    !t.isExportDefaultDeclaration(parent) &&
    !t.isExportNamedDeclaration(parent)
  ) {
    this.printJoin(node.decorators, node);
  }

  if (node.declare) {
    // TS
    this.word("declare");
    this.space();
  }

  if (node.abstract) {
    // TS
    this.word("abstract");
    this.space();
  }

  this.word("class");

  if (node.id) {
    this.space();
    this.print(node.id, node);
  }

  this.print(node.typeParameters, node);

  if (node.superClass) {
    this.space();
    this.word("extends");
    this.space();
    this.print(node.superClass, node);
    this.print(node.superTypeParameters, node);
  }

  if (node.implements) {
    this.space();
    this.word("implements");
    this.space();
    this.printList(node.implements, node);
  }

  this.space();
  this.print(node.body, node);
}

export { ClassDeclaration as ClassExpression };

export function ClassBody(node: Object) {
  this.token("{");
  this.printInnerComments(node);
  if (node.body.length === 0) {
    this.token("}");
  } else {
    this.newline();

    this.indent();
    this.printSequence(node.body, node);
    this.dedent();

    if (!this.endsWith("\n")) this.newline();

    this.rightBrace();
  }
}

export function ClassProperty(node: Object) {
  this.printJoin(node.decorators, node);

  if (node.accessibility) {
    // TS
    this.word(node.accessibility);
    this.space();
  }
  if (node.static) {
    this.word("static");
    this.space();
  }
  if (node.abstract) {
    // TS
    this.word("abstract");
    this.space();
  }
  if (node.readonly) {
    // TS
    this.word("readonly");
    this.space();
  }
  if (node.computed) {
    this.token("[");
    this.print(node.key, node);
    this.token("]");
  } else {
    this._variance(node);
    this.print(node.key, node);
  }

  if (node.optional) {
    // TS
    this.token("?");
  }

  this.print(node.typeAnnotation, node);
  if (node.value) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.value, node);
  }
  this.semicolon();
}

export function ClassMethod(node: Object) {
  this._classMethodHead(node);
  this.space();
  this.print(node.body, node);
}

export function _classMethodHead(node) {
  this.printJoin(node.decorators, node);

  if (node.accessibility) {
    // TS
    this.word(node.accessibility);
    this.space();
  }

  if (node.abstract) {
    // TS
    this.word("abstract");
    this.space();
  }

  if (node.static) {
    this.word("static");
    this.space();
  }

  this._methodHead(node);
}
