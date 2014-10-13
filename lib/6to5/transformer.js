module.exports = Transformer;

var traverse = require("./traverse");
var _        = require("lodash");

function Transformer(key, transformer) {
  this.transformer = Transformer.normalise(transformer);
  this.key         = key;
}

Transformer.normalise = function (transformer) {
  _.each(transformer, function (fns, type) {
    if (_.isFunction(fns)) fns = { enter: fns };
    transformer[type] = fns;
  });
  return transformer;
};

Transformer.prototype.transform = function (file) {
  if (!this.canRun(file)) return;

  var transformer = this.transformer;

  var build = function (exit) {
    return function (node, parent) {
      // add any node type aliases that exist
      var types = [node.type].concat(traverse.aliases[node.type] || []);

      var fns = transformer.all;

      _.each(types, function (type) {
        fns = transformer[type] || fns;
      });

      // this transformer cannot deal with this node type
      if (!fns) return;

      var fn = fns.enter;
      if (exit) fn = fns.exit;
      if (!fn) return;

      return fn(node, parent, file);
    };
  };

  traverse(file.ast, {
    enter: build(),
    exit:  build(true)
  });
};

Transformer.prototype.canRun = function (file) {
  var opts = file.opts;

  var blacklist = opts.blacklist;
  if (blacklist.length && _.contains(blacklist, this.key)) return false;

  var whitelist = opts.whitelist;
  if (whitelist.length && !_.contains(whitelist, this.key)) return false;

  return true;
};
