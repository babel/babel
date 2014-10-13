module.exports = File;

var transform = require("./transform");
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

  _.each(transform.transformers, function (transformer) {
    transformer.transform(self);
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
