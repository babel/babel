import includes from "lodash/collection/includes";
import traverse from "../traversal";

/**
 * This class is responsible for traversing over the provided `File`s
 * AST and running it's parent transformers handlers over it.
 */

export default class TransformerPass {
  constructor(file: File, transformer: Transformer) {
    this.transformer = transformer;
    this.handlers    = transformer.handlers;
    this.skipKey     = transformer.skipKey;
    this.file        = file;
    this.ran         = false;
  }

  canTransform(): boolean {
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
    if (whitelist) return includes(whitelist, key);

    // stage
    var stage = transformer.metadata.stage;
    if (stage != null && stage >= opts.stage) return true;

    // optional
    if (transformer.metadata.optional && !includes(opts.optional, key)) return false;

    return true;
  }

  checkPath(path: TraversalPath): boolean {
    var shouldVisit = this.transformer.shouldVisit;
    if (!shouldVisit) return;

    var shouldSkip = !shouldVisit(path.node);
    do {
      if (path.getData(this.skipKey) !== false) {
        path.setData(this.skipKey, shouldSkip);
      }
    } while(path = path.parentPath);
  }

  transform() {
    var file = this.file;

    file.log.debug(`Running transformer ${this.transformer.key}`);

    traverse(file.ast, this.handlers, file.scope, file);

    this.ran = true;
  }
}
