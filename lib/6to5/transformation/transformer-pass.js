module.exports = TransformerPass;

var traverse = require("../traverse");
var util     = require("../util");
var contains = require("lodash/collection/contains");

/**
 * This class is responsible for traversing over the provided `File`s
 * AST and running it's parent transformers handlers over it.
 */

function TransformerPass(file, transformer) {
  this.transformer = transformer;
  this.shouldRun   = !transformer.check;
  this.handlers    = transformer.handlers;
  this.file        = file;
}

TransformerPass.prototype.astRun = function (key) {
  if (!this.shouldRun) return;

  var handlers = this.handlers;
  var file = this.file;

  if (handlers.ast && handlers.ast[key]) {
    handlers.ast[key](file.ast, file);
  }
};

TransformerPass.prototype.canRun = function () {
  var transformer = this.transformer;

  var opts = this.file.opts;
  var key  = transformer.key;

  // internal
  if (key[0] === "_") return true;

  // blacklist
  var blacklist = opts.blacklist;
  if (blacklist.length && contains(blacklist, key)) return false;

  // whitelist
  var whitelist = opts.whitelist;
  if (whitelist.length && !contains(whitelist, key)) return false;

  // optional
  if (transformer.optional && !contains(opts.optional, key)) return false;

  // experimental
  if (transformer.experimental && !opts.experimental) return false;

  // playground
  if (transformer.playground && !opts.playground) return false;

  return true;
};

TransformerPass.prototype.checkNode = function (node) {
  var check = this.transformer.check;
  if (check) {
    return this.shouldRun = check(node);
  } else {
    return true;
  }
};

var transformVisitor = {
  enter: function (node, parent, scope, context, state) {
    var fns = state.handlers[node.type];
    if (!fns) return;
    return fns.enter(node, parent, scope, context, state.file, state.pass);
  },

  exit: function (node, parent, scope, context, state) {
    var fns = state.handlers[node.type];
    if (!fns) return;
    return fns.exit(node, parent, scope, context, state.file, state.pass);
  }
};

TransformerPass.prototype.transform = function () {
  if (!this.shouldRun) return;

  var file = this.file;

  util.debug(file.opts.filename + ": Running transformer " + this.transformer.key);

  this.astRun("before");

  var state = { file: file, handlers: this.handlers, pass: this };
  traverse(file.ast, transformVisitor, file.scope, state);

  this.astRun("after");
};
