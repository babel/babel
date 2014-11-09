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
    if (_.isFunction(fns)) fns = { enter: fns };
    transformer[type] = fns;
  });

  return transformer;
};

Transformer.prototype.transform = function (file) {
  if (!this.canRun(file)) return;

  var transformer = this.transformer;
  var ast         = file.ast;

  var astRun = function (key) {
    if (transformer.ast && transformer.ast[key]) {
      transformer.ast[key](ast, file);
    }
  };

  astRun("enter");

  var build = function (exit) {
    return function (node, parent, scope) {
      // add any node type aliases that exist
      var types = [node.type].concat(t.ALIAS_KEYS[node.type] || []);

      var fns = transformer.all;

      _.each(types, function (type) {
        fns = transformer[type] || fns;
      });

      // this transformer cannot deal with this node type
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

  astRun("exit");
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
