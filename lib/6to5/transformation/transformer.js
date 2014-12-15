module.exports = Transformer;

var traverse = require("../traverse");
var t        = require("../types");
var _        = require("lodash");

function Transformer(key, transformer) {
  this.transformer = Transformer.normalise(transformer);
  this.key         = key;
}

Transformer.normalise = function (transformer) {
  if (_.isFunction(transformer)) {
    transformer = { ast: transformer };
  }

  _.each(transformer, function (fns, type) {
    if (type[0] === "_") return;
    if (_.isFunction(fns)) fns = { enter: fns };
    transformer[type] = fns;

    var aliases = t.FLIPPED_ALIAS_KEYS[type];
    if (aliases) {
      _.each(aliases, function (alias) {
        transformer[alias] = fns;
      });
    }
  });

  return transformer;
};

Transformer.prototype.astRun = function (file, key) {
  var transformer = this.transformer;
  var ast         = file.ast;

  if (transformer.ast && transformer.ast[key]) {
    transformer.ast[key](ast, file);
  }
};

Transformer.prototype.transform = function (file) {
  if (!this.canRun(file)) return;

  var transformer = this.transformer;
  var ast         = file.ast;

  this.astRun(file, "enter");

  var build = function (exit) {
    return function (node, parent, scope) {
      var fns = transformer[node.type];
      if (!fns) return;

      var fn = fns.enter;
      if (exit) fn = fns.exit;
      if (!fn) return;

      return fn(node, parent, file, scope);
    };
  };

  traverse(ast, {
    enter: build(),
    exit:  build(true)
  });

  this.astRun(file, "exit");
};

Transformer.prototype.canRun = function (file) {
  var opts = file.opts;
  var key  = this.key;

  var blacklist = opts.blacklist;
  if (blacklist.length && _.contains(blacklist, key)) return false;

  if (key[0] !== "_") {
    var whitelist = opts.whitelist;
    if (whitelist.length && !_.contains(whitelist, key)) return false;
  }

  return true;
};
