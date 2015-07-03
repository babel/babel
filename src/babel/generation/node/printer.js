/**
 * [Please add a description.]
 */

export default class NodePrinter {
  constructor(generator, parent) {
    this.generator = generator;
    this.parent = parent;
  }

  /**
   * [Please add a description.]
   */

  plain(node, opts) {
    return this.generator.print(node, this.parent, opts);
  }

  /**
   * [Please add a description.]
   */

  sequence(nodes, opts = {}) {
    opts.statement = true;
    return this.generator.printJoin(this, nodes, opts);
  }

  /**
   * [Please add a description.]
   */

  join(nodes, opts) {
    return this.generator.printJoin(this, nodes, opts);
  }

  /**
   * [Please add a description.]
   */

  list(items, opts = {}) {
    if (opts.separator == null) {
      opts.separator = ",";
      if (!this.generator.format.compact) opts.separator += " ";
    }

    return this.join(items, opts);
  }

  /**
   * [Please add a description.]
   */

  block(node) {
    return this.generator.printBlock(this, node);
  }

  /**
   * [Please add a description.]
   */

  indentOnComments(node) {
    return this.generator.printAndIndentOnComments(this, node);
  }
}
