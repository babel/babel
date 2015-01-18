"use strict";

module.exports = File;

var SHEBANG_REGEX = /^\#\!.*/;

var transform = require("./transformation/transform");
var generate  = require("./generation/generator");
var Scope     = require("./traverse/scope");
var util      = require("./util");
var t         = require("./types");
var _         = require("lodash");

function File(opts) {
  this.dynamicImports   = [];
  this.dynamicImportIds = {};
  this.opts             = File.normaliseOptions(opts);
  this.transformers     = this.getTransformers();
  this.uids             = {};
  this.ast              = {};
}

File.helpers = [
  "inherits",
  "defaults",
  "prototype-properties",
  "apply-constructor",
  "tagged-template-literal",
  "tagged-template-literal-loose",
  "interop-require",
  "to-array",
  "sliced-to-array",
  "object-without-properties",
  "has-own",
  "slice",
  "bind",
  "define-property",
  "async-to-generator",
  "interop-require-wildcard",
  "typeof",
  "extends",
  "get"
];

File.excludeHelpersFromRuntime = [
  "async-to-generator",
  "typeof",
  "tagged-template-literal-loose"
];

File.normaliseOptions = function (opts) {
  opts = _.cloneDeep(opts || {});

  _.defaults(opts, {
    keepModuleIdExtensions: false,
    includeRegenerator:     false,
    experimental:           false,
    reactCompat:            false,
    playground:             false,
    whitespace:             true,
    moduleIds:              opts.amdModuleIds || false,
    blacklist:              [],
    whitelist:              [],
    sourceMap:              false,
    optional:               [],
    comments:               true,
    filename:               "unknown",
    modules:                "common",
    runtime:                false,
    loose:                  [],
    code:                   true,
    ast:                    true
  });

  // normalise windows path separators to unix
  opts.filename = opts.filename.replace(/\\/g, "/");

  opts.blacklist = util.arrayify(opts.blacklist);
  opts.whitelist = util.arrayify(opts.whitelist);
  opts.optional  = util.arrayify(opts.optional);
  opts.loose     = util.arrayify(opts.loose);

  if (_.contains(opts.loose, "all")) {
    opts.loose = Object.keys(transform.transformers);
  }

  // todo: remove in 3.0.0
  _.each({
    fastForOf: "forOf",
    classesFastSuper: "classes"
  }, function (newTransformer, oldTransformer) {
    if (_.contains(opts.optional, oldTransformer)) {
      _.pull(opts.optional, oldTransformer);
      opts.loose.push(newTransformer);
    }
  });

  _.defaults(opts, {
    moduleRoot: opts.sourceRoot
  });

  _.defaults(opts, {
    sourceRoot: opts.moduleRoot
  });

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

  if (opts.playground) {
    opts.experimental = true;
  }

  transform._ensureTransformerNames("blacklist", opts.blacklist);
  transform._ensureTransformerNames("whitelist", opts.whitelist);
  transform._ensureTransformerNames("optional", opts.optional);
  transform._ensureTransformerNames("loose", opts.loose);

  return opts;
};

File.prototype.isLoose = function (key) {
  return _.contains(this.opts.loose, key);
};

File.prototype.getTransformers = function () {
  var file = this;
  var transformers = [];
  var secondPassTransformers = [];

  _.each(transform.transformers, function (transformer) {
    if (transformer.canRun(file)) {
      transformers.push(transformer);

      if (transformer.secondPass) {
        secondPassTransformers.push(transformer);
      }

      if (transformer.manipulateOptions) {
        transformer.manipulateOptions(file.opts, file);
      }
    }
  });

  return transformers.concat(secondPassTransformers);
};

File.prototype.toArray = function (node, i) {
  if (t.isArrayExpression(node)) {
    return node;
  } else if (t.isIdentifier(node) && node.name === "arguments") {
    return t.callExpression(t.memberExpression(this.addHelper("slice"), t.identifier("call")), [node]);
  } else {
    var declarationName = "to-array";
    var args = [node];
    if (i) {
      args.push(t.literal(i));
      declarationName = "sliced-to-array";
    }
    return t.callExpression(this.addHelper(declarationName), args);
  }
};

File.prototype.getModuleFormatter = function (type) {
  var ModuleFormatter = _.isFunction(type) ? type : transform.moduleFormatters[type];

  if (!ModuleFormatter) {
    var loc = util.resolve(type);
    if (loc) ModuleFormatter = require(loc);
  }

  if (!ModuleFormatter) {
    throw new ReferenceError("Unknown module formatter type " + JSON.stringify(type));
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

File.prototype.addImport = function (source, name) {
  name = name || source;
  var id = this.dynamicImportIds[name];

  if (!id) {
    id = this.dynamicImportIds[name] = this.generateUidIdentifier(name);

    var specifiers = [t.importSpecifier(t.identifier("default"), id)];
    var declar = t.importDeclaration(specifiers, t.literal(source));
    declar._blockHoist = 3;
    this.dynamicImports.push(declar);
  }

  return id;
};

File.prototype.addHelper = function (name) {
  if (!_.contains(File.helpers, name)) {
    throw new ReferenceError("unknown declaration " + name);
  }

  var program = this.ast.program;

  var declar = program._declarations && program._declarations[name];
  if (declar) return declar.id;

  var ref;
  var runtimeNamespace = this.opts.runtime;
  if (runtimeNamespace && !_.contains(File.excludeHelpersFromRuntime, name)) {
    name = t.identifier(t.toIdentifier(name));
    return t.memberExpression(t.identifier(runtimeNamespace), name);
  } else {
    ref = util.template(name);
  }

  var uid = this.generateUidIdentifier(name);
  this.scope.push({
    key: name,
    id: uid,
    init: ref
  });
  return uid;
};

File.prototype.errorWithNode = function (node, msg, Error) {
  Error = Error || SyntaxError;

  var loc = node.loc.start;
  var err = new Error("Line " + loc.line + ": " + msg);
  err.loc = loc;
  return err;
};

File.prototype.addCode = function (code) {
  code = (code || "") + "";
  this.code = code;
  return this.parseShebang(code);
};

File.prototype.parse = function (code) {
  var self = this;

  code = this.addCode(code);

  return util.parse(this.opts, code, function (tree) {
    self.transform(tree);
    return self.generate();
  });
};

File.prototype.transform = function (ast) {
  var self = this;

  this.ast = ast;
  this.scope = new Scope(ast.program);
  this.moduleFormatter = this.getModuleFormatter(this.opts.modules);

  var astRun = function (key) {
    _.each(self.transformers, function (transformer) {
      transformer.astRun(self, key);
    });
  };

  astRun("enter");

  _.each(this.transformers, function (transformer) {
    transformer.transform(self);
  });

  astRun("exit");
};

File.prototype.generate = function () {
  var opts = this.opts;
  var ast  = this.ast;

  var result = {
    code: "",
    map: null,
    ast: null
  };

  if (opts.ast) result.ast = ast;
  if (!opts.code) return result;

  var _result = generate(ast, opts, this.code);
  result.code = _result.code;
  result.map  = _result.map;

  if (this.shebang) {
    // add back shebang
    result.code = this.shebang + "\n" + result.code;
  }

  if (opts.sourceMap === "inline") {
    result.code += "\n" + util.sourceMapToComment(result.map);
  }

  return result;
};

File.prototype.generateUid = function (name, scope) {
  name = t.toIdentifier(name).replace(/^_+/, "");

  scope = scope || this.scope;

  var uid;
  do {
    uid = this._generateUid(name);
  } while (scope.has(uid));
  return uid;
};

File.prototype.generateUidIdentifier = function (name, scope) {
  scope = scope || this.scope;
  var id = t.identifier(this.generateUid(name, scope));
  scope.add(id);
  return id;
};

File.prototype._generateUid = function (name) {
  var uids = this.uids;
  var i = uids[name] || 1;

  var id = name;
  if (i > 1) id += i;
  uids[name] = i + 1;
  return "_" + id;
};
