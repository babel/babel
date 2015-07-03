/**
 * [Please add a description.]
 */

export function File(node, print) {
  print.plain(node.program);
}

/**
 * [Please add a description.]
 */

export function Program(node, print) {
  print.sequence(node.body);
}

/**
 * [Please add a description.]
 */

export function BlockStatement(node, print) {
  if (node.body.length === 0) {
    this.push("{}");
  } else {
    this.push("{");
    this.newline();
    print.sequence(node.body, { indent: true });
    if (!this.format.retainLines) this.removeLast("\n");
    this.rightBrace();
  }
}

/**
 * [Please add a description.]
 */

export function Noop() {

}
