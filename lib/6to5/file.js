module.exports = File;

var SHEBANG_REGEX = /^\#\!.*/;

var transform = require("./transformation/transform");
var generate  = require("./generation/generator");
var Scope     = require("./traverse/scope");
var util      = require("./util");
var t         = require("./types");
var _         = require("lodash");

function File(opts) {
  this.opts            = File.normaliseOptions(opts);
  this.moduleFormatter = this.getModuleFormatter(this.opts.modules);

  this.declarations = {};
  this.uids         = {};
  this.ast          = {};
}

File.declarations = ["extends", "class-props", "slice", "apply-constructor",
                     "tagged-template-literal"];

File.normaliseOptions = function (opts) {
  opts = _.cloneDeep(opts || {});

  _.defaults(opts, {
    whitespace: true,
    blacklist:  [],
    whitelist:  [],
    sourceMap:  false,
    comments:   true,
    filename:   "unknown",
    modules:    "common",
    runtime:    false,
    code:       true
  });

  // normalise windows path separators to unix
  opts.filename = opts.filename.replace(/\\/g, "/");

  _.defaults(opts, {
    filenameRelative: opts.filename
  });

  _.defaults(opts, {
    sourceFileName: opts.filenameRelative,
    sourceMapName:  opts.filenameRelative
  });

  if (opts.runtime === true) {
    opts.runtime = "to5Runtime";
  }

  transform._ensureTransformerNames("blacklist", opts.blacklist);
  transform._ensureTransformerNames("whitelist", opts.whitelist);

  return opts;
};

File.prototype.getModuleFormatter = function (type) {
  var ModuleFormatter = transform.moduleFormatters[type];

  if (!ModuleFormatter) {
    var loc = util.resolve(type);
    if (loc) ModuleFormatter = require(loc);
  }

  if (!ModuleFormatter) {
    throw new ReferenceError("unknown module formatter type " + type);
  }

  return new ModuleFormatter(this);
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
  if (!_.contains(File.declarations, name)) {
    throw new ReferenceError("unknown declaration " + name);
  }

  var declar = this.declarations[name];
  if (declar) return declar.uid;

  var ref;
  var runtimeNamespace = this.opts.runtime;
  if (runtimeNamespace) {
    name = t.identifier(t.toIdentifier(name));
    return t.memberExpression(t.identifier(runtimeNamespace), name);
  } else {
    ref = util.template(name);
  }

  var uid = t.identifier(this.generateUid(name));
  this.declarations[name] = {
    uid: uid,
    node: ref
  };
  return uid;
};

File.prototype.errorWithNode = function (node, msg, Error) {
  Error = Error || SyntaxError;

  var loc = node.loc.start;
  var err = new Error("Line " + loc.line + ": " + msg);
  err.loc = loc;
  return err;
};

File.prototype.parse = function (code) {
  code = (code || "") + "";

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

  if (!opts.code) {
    return {
      code: "",
      map:  null,
      ast:  ast
    };
  }

  var result = generate(ast, opts, this.code);

  if (this.shebang) {
    // add back shebang
    result.code = this.shebang + "\n" + result.code;
  }

  if (opts.sourceMap === "inline") {
    result.code += "\n" + util.sourceMapToComment(result.map);
  }

  result.ast = result;

  return result;
};

File.prototype.generateUid = function (name, scope) {
  name = t.toIdentifier(name);

  scope = scope || this.scope;

  var uid;
  do {
    uid = this._generateUid(name);
  } while (scope.has(uid));
  return uid;
};

File.prototype._generateUid = function (name) {
  var uids = this.uids;
  var i = uids[name] || 1;

  var id = name;
  if (i > 1) id += i;
  uids[name] = i + 1;
  return "_" + id;
};
