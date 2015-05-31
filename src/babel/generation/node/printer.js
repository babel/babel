export default class NodePrinter {
  constructor(generator, parent) {
    this.generator = generator;
    this.parent = parent;
  }

  plain(node, opts) {
    return this.generator.print(node, this.parent, opts);
  }

  sequence(nodes, opts = {}) {
    opts.statement = true;
    return this.generator.printJoin(this, nodes, opts);
  }

  join(nodes, opts) {
    return this.generator.printJoin(this, nodes, opts);
  }

  list(items, opts = {}) {
    if (opts.separator == null) opts.separator = ", ";
    return this.join(items, opts);
  }

  block(node) {
    return this.generator.printBlock(this, node);
  }

  indentOnComments(node) {
    return this.generator.printAndIndentOnComments(this, node);
  }
}
