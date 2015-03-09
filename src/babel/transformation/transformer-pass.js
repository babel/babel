import includes from "lodash/collection/includes";

/**
 * This class is responsible for traversing over the provided `File`s
 * AST and running it's parent transformers handlers over it.
 */

export default class TransformerPass {
  constructor(file: File, transformer: Transformer) {
    this.transformer = transformer;
    this.shouldRun   = !transformer.check;
    this.handlers    = transformer.handlers;
    this.file        = file;
  }

  canRun(): boolean {
    var transformer = this.transformer;

    var opts = this.file.opts;
    var key  = transformer.key;

    // internal
    if (key[0] === "_") return true;

    // blacklist
    var blacklist = opts.blacklist;
    if (blacklist.length && includes(blacklist, key)) return false;

    // whitelist
    var whitelist = opts.whitelist;
    if (whitelist.length) return includes(whitelist, key);

    // optional
    if (transformer.optional && !includes(opts.optional, key)) return false;

    // experimental
    if (transformer.experimental && !opts.experimental) return false;

    // playground
    if (transformer.playground && !opts.playground) return false;

    return true;
  }

  checkNode(node: Object): boolean {
    var check = this.transformer.check;
    if (check) {
      return this.shouldRun = check(node);
    } else {
      return true;
    }
  }

  transform() {
    if (!this.shouldRun) return;

    var file = this.file;

    file.debug(`Running transformer ${this.transformer.key}`);

    file.scope.traverse(file.ast, this.handlers, file);
  }
}
