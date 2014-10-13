module.exports = File;

var SHEBANG_REGEX = /^\#\!.*/;

var transform = require("./transform");
var util      = require("./util");
var b         = require("recast").types.builders;
var _         = require("lodash");

function File(opts) {
  this.declarations = {};
  this.uids         = {};
  this.opts         = File.normaliseOptions(opts);
  this.ast          = {};
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

File.prototype.parseShebang = function (code) {
  var shebangMatch = code.match(SHEBANG_REGEX);
  if (shebangMatch) {
    this.shebang = shebangMatch[0];

    // remove shebang
    code = code.replace(SHEBANG_REGEX, "");
  }

  return code;
};

File.prototype.addDeclaration = function (name) {
  var declar = this.declarations[name];
  if (declar) return declar.uid;

  var uid = b.identifier(this.generateUid(name));
  this.declarations[name] = {
    uid: uid,
    node: util.template(name)
  };
  return uid;
};

File.prototype.parse = function (code) {
  var self = this;

  code = this.parseShebang(code);

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

  var body = ast.program.body;

  _.each(this.declarations, function (declar) {
    body.unshift(b.variableDeclaration("var", [
      b.variableDeclarator(declar.uid, declar.node)
    ]));
  });

  var result = util.generate(ast, opts);

  if (this.shebang) {
    // add back shebang
    result.code = this.shebang + result.code;
  }

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
