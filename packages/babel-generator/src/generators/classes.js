export function ClassDeclaration(node: Object) {
  this.printJoin(node.decorators, node);
  this.push("class");

  if (node.id) {
    this.push(" ");
    this.print(node.id, node);
  }

  this.print(node.typeParameters, node);

  if (node.superClass) {
    this.push(" extends ");
    this.print(node.superClass, node);
    this.print(node.superTypeParameters, node);
  }

  if (node.implements) {
    this.push(" implements ");
    this.printList(node.implements, node);
  }

  this.space();
  this.print(node.body, node);
}

export { ClassDeclaration as ClassExpression };

export function ClassBody(node: Object) {
  this.push("{");
  this.printInnerComments(node);
  if (node.body.length === 0) {
    this.push("}");
  } else {
    this.newline();

    this.indent();
    this.printSequence(node.body, node);
    this.dedent();

    this.rightBrace();
  }
}

export function ClassProperty(node: Object) {
  this.printJoin(node.decorators, node);

  if (node.static) this.push("static ");
  this.print(node.key, node);
  this.print(node.typeAnnotation, node);
  if (node.value) {
    this.space();
    this.push("=");
    this.space();
    this.print(node.value, node);
  }
  this.semicolon();
}

export function ClassMethod(node: Object) {
  this.printJoin(node.decorators, node);

  if (node.static) {
    this.push("static ");
  }

  if (node.kind === "constructorCall") {
    this.push("call ");
  }

  this._method(node);
}
