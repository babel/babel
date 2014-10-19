module.exports = File;

var SHEBANG_REGEX = /^\#\!.*/;

var transform = require("./transform");
var recast    = require("recast");
var util      = require("./util");
var b         = require("ast-types").builders;
var _         = require("lodash");

function File(opts) {
  this.opts            = File.normaliseOptions(opts);
  this.moduleFormatter = this.getModuleFormatter(opts.modules);

  this.declarations = {};
  this.uids         = {};
  this.ast          = {};
}

File.normaliseOptions = function (opts) {
  opts = opts || {};

  _.defaults(opts, {
    blacklist: [],
    whitelist: [],
    sourceMap: false,
    filename:  "unknown",
    modules:   "common"
  });

  _.defaults(opts, {
    sourceFileName: opts.filename,
    sourceMapName:  opts.filename
  });

  transform._ensureTransformerNames("blacklist", opts.blacklist);
  transform._ensureTransformerNames("whitelist", opts.whitelist);

  return opts;
};

File.prototype.getModuleFormatter = function (type) {
  var ModuleLoader = transform.moduleFormatters[type];
  if (!ModuleLoader) throw new ReferenceError("unknown module formatter type " + type);
  return new ModuleLoader(this);
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

  _.each(transform.transformers, function (transformer) {
    transformer.transform(self);
  });

  return this.generate();
};

File.prototype.generate = function () {
  var opts = this.opts;
  var ast  = this.ast;

  var printOpts = {
    tabWidth: 2
  };

  if (opts.sourceMap) {
    printOpts.sourceMapName = opts.sourceMapName;
  }

  var result = recast.print(ast, printOpts);
  var code   = result.code;

  if (this.shebang) {
    // add back shebang
    code = this.shebang + code;
  }

  if (opts.sourceMap === "inline") {
    code += "\n" + util.sourceMapToComment(result.map);
  }

  return {
    code: code,
    map:  result.map || null,
    ast:  ast
  };
};

File.prototype.generateUid = function (name) {
  // replace all non-valid identifiers with dashes
  name = name.replace(/[^a-zA-Z0-9]/g, "-");

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-_\s]+(.)?/g, function(match, c){
    return c ? c.toUpperCase() : "";
  });

  var uids = this.uids;
  var i = uids[name] || 1;

  var id = name;
  if (i > 1) id += i;
  uids[name] = i + 1;
  return "_" + id;
};
