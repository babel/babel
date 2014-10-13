module.exports = File;

var transform = require("./transform");
var traverse  = require("./traverse");
var util      = require("./util");
var _         = require("lodash");

function File(opts) {
  this.uids = {};
  this.opts = File.normaliseOptions(opts);
  this.ast  = {};
}

File.normaliseOptions = function (opts) {
  opts = opts || {};

  _.defaults(opts, {
    blacklist: [],
    whitelist: [],
    sourceMap: false,
    filename:  "unknown",
    format:    {}
  });

  _.defaults(opts, {
    sourceFileName: opts.filename,
    sourceMapName:  opts.filename
  });

  transform._ensureTransformerNames("blacklist", opts.blacklist);
  transform._ensureTransformerNames("whitelist", opts.whitelist);

  return opts;
};

File.prototype.parse = function (code) {
  // remove shebang
  code = code.replace(/^\#\!.*/, "");

  var self = this;

  return util.parse(this.opts, code, function (tree) {
    return self.transform(tree);
  });
};

File.prototype.transform = function (ast) {
  this.ast = ast;

  var self = this;
  var opts = this.opts;

  _.each(transform.transformers, function (transformer, name) {
    self.runTransformer(name, transformer);
  });

  var result = util.generate(ast, opts);

  if (opts.sourceMap === "inline") {
    result.code += "\n" + util.sourceMapToComment(result.map);
  }

  result.map = result.map || null;
  result.ast = ast;

  return result;
};

File.prototype.generateUid = function (name) {
  var uids = this.uids;
  var i = uids[name] || 1;

  var id = name;
  if (i > 1) id += i;
  uids[name] = i + 1;
  return "_" + id;
};

File.prototype.canRunTransformer = function (name) {
  var opts = this.opts;

  var blacklist = opts.blacklist;
  if (blacklist.length && _.contains(blacklist, name)) return false;

  var whitelist = opts.whitelist;
  if (whitelist.length && !_.contains(whitelist, name)) return false;

  return true;
};

File.prototype.runTransformer = function (name, transformer) {
  if (!this.canRunTransformer(name)) return;

  var self = this;

  var build = function (exit) {
    return function (node, parent) {
      var types = [node.type].concat(traverse.aliases[node.type] || []);

      var fns = transformer.all;

      _.each(types, function (type) {
        fns = transformer[type] || fns;
      });

      if (!fns) return;

      var fn = fns.enter || fns;
      if (exit) fn = fns.exit;
      if (!fn || !_.isFunction(fn)) return;

      return fn(node, parent, self);
    };
  };

  traverse(this.ast, {
    enter: build(),
    exit:  build(true)
  });
};
