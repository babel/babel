export function ClassDeclaration(node, print) {
  print.list(node.decorators);
  this.push("class");

  if (node.id) {
    this.push(" ");
    print.plain(node.id);
  }

  print.plain(node.typeParameters);

  if (node.superClass) {
    this.push(" extends ");
    print.plain(node.superClass);
    print.plain(node.superTypeParameters);
  }

  if (node.implements) {
    this.push(" implements ");
    print.join(node.implements, { separator: ", " });
  }

  this.space();
  print.plain(node.body);
}

export { ClassDeclaration as ClassExpression };

export function ClassBody(node, print) {
  if (node.body.length === 0) {
    this.push("{}");
  } else {
    this.push("{");
    this.newline();

    this.indent();
    print.sequence(node.body);
    this.dedent();

    this.rightBrace();
  }
}


export function ClassProperty(node, print) {
  print.list(node.decorators);

  if (node.static) this.push("static ");
  print.plain(node.key);
  print.plain(node.typeAnnotation);
  if (node.value) {
    this.space();
    this.push("=");
    this.space();
    print.plain(node.value);
  }
  this.semicolon();
}

export function MethodDefinition(node, print) {
  print.list(node.decorators);

  if (node.static) {
    this.push("static ");
  }

  this._method(node, print);
}
