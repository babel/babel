/**
 * Printer for nodes, needs a `generator` and a `parent`.
 */

export default class NodePrinter {
  constructor(generator, parent) {
    this.generator = generator;
    this.parent = parent;
  }

  /**
   * Description
   */

  printInnerComments() {
    if (!this.parent.innerComments) return;
    var gen = this.generator;
    gen.indent();
    gen._printComments(this.parent.innerComments);
    gen.dedent();
  }

  /**
   * Print a plain node.
   */

  plain(node, opts) {
    return this.generator.print(node, this.parent, opts);
  }

  /**
   * Print a sequence of nodes as statements.
   */

  sequence(nodes, opts = {}) {
    opts.statement = true;
    return this.generator.printJoin(this, nodes, opts);
  }

  /**
   * Print a sequence of nodes as expressions.
   */

  join(nodes, opts) {
    return this.generator.printJoin(this, nodes, opts);
  }

  /**
   * Print a list of nodes, with a customizable separator (defaults to ",").
   */

  list(items, opts = {}) {
    if (opts.separator == null) {
      opts.separator = ",";
      if (!this.generator.format.compact) opts.separator += " ";
    }

    return this.join(items, opts);
  }

  /**
   * Print a block-like node.
   */

  block(node) {
    return this.generator.printBlock(this, node);
  }

  /**
   * Print node and indent comments.
   */

  indentOnComments(node) {
    return this.generator.printAndIndentOnComments(this, node);
  }
}
