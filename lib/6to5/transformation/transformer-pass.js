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
  this.handlers    = transformer.handlers;
  this.file        = file;
}

TransformerPass.prototype.astRun = function (key) {
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
  if (key[0] === "_") return true;

  var blacklist = opts.blacklist;
  if (blacklist.length && contains(blacklist, key)) return false;

  var whitelist = opts.whitelist;
  if (whitelist.length && !contains(whitelist, key)) return false;

  if (transformer.optional && !contains(opts.optional, key)) return false;

  if (transformer.experimental && !opts.experimental) return false;

  if (transformer.playground && !opts.playground) return false;

  return true;
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
  var file = this.file;

  util.debug(file.opts.filename + ": Running transformer " + this.transformer.key);

  this.astRun("before");

  var state = { file: file, handlers: this.handlers, pass: this };
  traverse(file.ast, transformVisitor, file.scope, state);

  this.astRun("after");
};
