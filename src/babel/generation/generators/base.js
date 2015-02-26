export function File(node, print) {
  print(node.program);
}

export function Program(node, print) {
  print.sequence(node.body);
}

export function BlockStatement(node, print) {
  if (node.body.length === 0) {
    this.push("{}");
  } else {
    this.push("{");
    this.newline();
    print.sequence(node.body, { indent: true });
    this.removeLast("\n");
    this.rightBrace();
  }
}
