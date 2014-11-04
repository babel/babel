module.exports = File;

var SHEBANG_REGEX = /^\#\!.*/;

var transform = require("./transform");
var generate  = require("./generator");
var Scope     = require("./scope");
var acorn     = require("acorn-6to5");
var util      = require("./util");
var t         = require("./types");
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
    whitespace: true,
    blacklist:  [],
    whitelist:  [],
    sourceMap:  false,
    filename:   "unknown",
    modules:    "common"
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

  if (!ModuleLoader) {
    var loc = util.resolve(type);
    if (loc) ModuleLoader = require(loc);
  }

  if (!ModuleLoader) {
    throw new ReferenceError("unknown module formatter type " + type);
  }

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

  var uid = t.identifier(this.generateUid(name));
  this.declarations[name] = {
    uid: uid,
    node: util.template(name)
  };
  return uid;
};

File.prototype.errorWithNode = function (node, msg) {
  var loc;

  if (node.loc) {
    loc = node.loc.start;
  } else {
    loc = acorn.getLineInfo(this.code, node.start);
  }

  var err = new SyntaxError("Line " + loc.line + ": " + msg);
  err.loc = loc;
  return err;
};

File.prototype.parse = function (code) {
  var self = this;

  this.code = code;
  code = this.parseShebang(code);

  return util.parse(this.opts, code, function (tree) {
    self.transform(tree);
    return self.generate();
  });
};

File.prototype.transform = function (ast) {
  this.ast = ast;
  this.scope = new Scope(null, ast.program);

  var self = this;

  _.each(transform.transformers, function (transformer) {
    transformer.transform(self);
  });
};

File.prototype.generate = function () {
  var opts = this.opts;
  var ast  = this.ast;

  var result = generate(this.code, ast, opts);

  if (this.shebang) {
    // add back shebang
    result.code = this.shebang + result.code;
  }

  if (opts.sourceMap === "inline") {
    result.code += "\n" + util.sourceMapToComment(result.map);
  }

  return result;
};

File.prototype.generateUid = function (name, scope) {
  scope = scope || this.scope;
  var uid;
  do {
    uid = this._generateUid(name);
  } while (scope.has(uid));
  return uid;
};

File.prototype._generateUid = function (name) {
  // replace all non-valid identifiers with dashes
  name = name.replace(/[^a-zA-Z0-9]/g, "-");

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });

  var uids = this.uids;
  var i = uids[name] || 1;

  var id = name;
  if (i > 1) id += i;
  uids[name] = i + 1;
  return "_" + id;
};
