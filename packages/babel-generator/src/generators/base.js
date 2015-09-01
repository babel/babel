export function File(node, print) {
  print.plain(node.program);
}

export function Program(node, print) {
  print.sequence(node.body);
}

export function BlockStatement(node, print) {
  this.push("{");
  if (node.body.length) {
    this.newline();
    print.sequence(node.body, { indent: true });
    if (!this.format.retainLines) this.removeLast("\n");
    this.rightBrace();
  } else {
    print.printInnerComments();
    this.push("}");
  }
}

export function Noop() {}
