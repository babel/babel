/**
 * Print ClassDeclaration, prints decorators, typeParameters, extends, implements, and body.
 */

export function ClassDeclaration(node, parent) {
  this.printList(node.decorators, node, { separator: "" });
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
    this.printJoin(node.implements, node, { separator: ", " });
  }

  this.space();
  this.print(node.body, node);
}

/**
 * Alias ClassDeclaration printer as ClassExpression.
 */

export { ClassDeclaration as ClassExpression };

/**
 * Print ClassBody, collapses empty blocks, prints body.
 */

export function ClassBody(node, parent) {
  this.push("{");
  if (node.body.length === 0) {
    this.printInnerComments(node);
    this.push("}");
  } else {
    this.newline();

    this.indent();
    this.printSequence(node.body, node);
    this.dedent();

    this.rightBrace();
  }
}

/**
 * Print ClassProperty, prints decorators, static, key, typeAnnotation, and value.
 * Also: semicolons, deal with it.
 */

export function ClassProperty(node, parent) {
  this.printList(node.decorators, node, { separator: "" });

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

/**
 * Print MethodDefinition, prints decorations, static, and method.
 */

export function MethodDefinition(node, parent) {
  this.printList(node.decorators, node, { separator: "" });

  if (node.static) {
    this.push("static ");
  }

  this._method(node);
}
