"use strict";

module.exports = File;

var SHEBANG_REGEX = /^\#\!.*/;

var isFunction = require("lodash/lang/isFunction");
var transform  = require("./index");
var generate   = require("../generation");
var defaults   = require("lodash/object/defaults");
var contains   = require("lodash/collection/contains");
var clone      = require("../helpers/clone");
var parse      = require("../helpers/parse");
var Scope      = require("../traversal/scope");
var util       = require("../util");
var path       = require("path");
var each       = require("lodash/collection/each");
var t          = require("../types");

function File(opts) {
  this.dynamicImportIds = {};
  this.dynamicImported  = [];
  this.dynamicImports   = [];

  this.dynamicData      = {};
  this.data             = {};

  this.lastStatements   = [];
  this.opts             = this.normalizeOptions(opts);
  this.ast              = {};

  this.buildTransformers();
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
  "get",
  "set",
  "class-call-check",
  "object-destructuring-empty"
];

File.validOptions = [
  "filename",
  "filenameRelative",
  "blacklist",
  "whitelist",
  "loose",
  "optional",
  "modules",
  "sourceMap",
  "sourceMapName",
  "sourceFileName",
  "sourceRoot",
  "moduleRoot",
  "moduleIds",
  "comments",
  "reactCompat",
  "keepModuleIdExtensions",
  "code",
  "ast",
  "format",
  "playground",
  "experimental",
  "resolveModuleSource",
  "runtime",

  // these are used by plugins
  "ignore",
  "only",
  "extensions",
  "accept"
];

File.prototype.normalizeOptions = function (opts) {
  opts = clone(opts);

  for (var key in opts) {
    if (key[0] !== "_" && File.validOptions.indexOf(key) < 0) {
      throw new ReferenceError("Unknown option: " + key);
    }
  }

  defaults(opts, {
    keepModuleIdExtensions: false,
    resolveModuleSource:    null,
    experimental:           false,
    reactCompat:            false,
    playground:             false,
    whitespace:             true,
    moduleIds:              false,
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

  // normalize windows path separators to unix
  opts.filename = opts.filename.replace(/\\/g, "/");

  opts.basename = path.basename(opts.filename, path.extname(opts.filename));

  opts.blacklist = util.arrayify(opts.blacklist);
  opts.whitelist = util.arrayify(opts.whitelist);
  opts.optional  = util.arrayify(opts.optional);
  opts.loose     = util.arrayify(opts.loose);

  if (contains(opts.loose, "all")) {
    opts.loose = Object.keys(transform.transformers);
  }

  defaults(opts, {
    moduleRoot: opts.sourceRoot
  });

  defaults(opts, {
    sourceRoot: opts.moduleRoot
  });

  defaults(opts, {
    filenameRelative: opts.filename
  });

  defaults(opts, {
    sourceFileName: opts.filenameRelative,
    sourceMapName:  opts.filenameRelative
  });

  if (opts.playground) {
    opts.experimental = true;
  }

  if (opts.runtime) {
    this.set("runtimeIdentifier", t.identifier("to5Runtime"));
  }

  opts.blacklist = transform._ensureTransformerNames("blacklist", opts.blacklist);
  opts.whitelist = transform._ensureTransformerNames("whitelist", opts.whitelist);
  opts.optional = transform._ensureTransformerNames("optional", opts.optional);
  opts.loose = transform._ensureTransformerNames("loose", opts.loose);

  return opts;
};

File.prototype.isLoose = function (key) {
  return contains(this.opts.loose, key);
};

File.prototype.buildTransformers = function () {
  var file = this;

  var transformers = {};

  var secondaryStack = [];
  var stack = [];

  each(transform.transformers, function (transformer, key) {
    var pass = transformers[key] = transformer.buildPass(file);

    if (pass.canRun(file)) {
      stack.push(pass);

      if (transformer.secondPass) {
        secondaryStack.push(pass);
      }

      if (transformer.manipulateOptions) {
        transformer.manipulateOptions(file.opts, file);
      }
    }
  });

  this.transformerStack = stack.concat(secondaryStack);
  this.transformers = transformers;
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
  var ModuleFormatter = isFunction(type) ? type : transform.moduleFormatters[type];

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

File.prototype.set = function (key, val) {
  return this.data[key] = val;
};

File.prototype.setDynamic = function (key, fn) {
  this.dynamicData[key] = fn;
};

File.prototype.get = function (key) {
  var data = this.data[key];
  if (data) {
    return data;
  } else {
    var dynamic = this.dynamicData[key];
    if (dynamic) {
      return this.set(key, dynamic());
    }
  }
};

File.prototype.addImport = function (source, name) {
  name = name || source;
  var id = this.dynamicImportIds[name];

  if (!id) {
    id = this.dynamicImportIds[name] = this.generateUidIdentifier(name);

    var specifiers = [t.importSpecifier(t.identifier("default"), id)];
    var declar = t.importDeclaration(specifiers, t.literal(source));
    declar._blockHoist = 3;
    this.dynamicImported.push(declar);

    this.moduleFormatter.importSpecifier(specifiers[0], declar, this.dynamicImports);
  }

  return id;
};

File.prototype.isConsequenceExpressionStatement = function (node) {
  return t.isExpressionStatement(node) && this.lastStatements.indexOf(node) >= 0;
};

File.prototype.addHelper = function (name) {
  if (!contains(File.helpers, name)) {
    throw new ReferenceError("unknown declaration " + name);
  }

  var program = this.ast.program;

  var declar = program._declarations && program._declarations[name];
  if (declar) return declar.id;

  var runtime = this.get("runtimeIdentifier");
  if (runtime) {
    name = t.identifier(t.toIdentifier(name));
    return t.memberExpression(runtime, name);
  } else {
    var ref = util.template(name);
    ref._compact = true;
    var uid = this.generateUidIdentifier(name);
    this.scope.push({
      key: name,
      id: uid,
      init: ref
    });
    return uid;
  }
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

  var opts = this.opts;

  opts.allowImportExportEverywhere = this.isLoose("es6.modules");
  //opts.strictMode = this.transformers.useStrict.canRun();

  return parse(opts, code, function (tree) {
    self.transform(tree);
    return self.generate();
  });
};

File.prototype.transform = function (ast) {
  var self = this;

  util.debug(this.opts.filename);

  this.ast = ast;
  this.lastStatements = t.getLastStatements(ast.program);
  this.scope = new Scope(ast.program, ast, null, this);

  var modFormatter = this.moduleFormatter = this.getModuleFormatter(this.opts.modules);
  if (modFormatter.init && this.transformers["es6.modules"].canRun()) {
    modFormatter.init();
  }

  this.checkNode(ast);

  var astRun = function (key) {
    each(self.transformerStack, function (pass) {
      pass.astRun(key);
    });
  };

  astRun("enter");

  each(this.transformerStack, function (pass) {
    pass.transform();
  });

  astRun("exit");
};

var checkTransformerVisitor = {
  enter: function (node, parent, scope, context, state) {
    checkNode(state.stack, node, scope);
  }
};

var checkNode = function (stack, node, scope) {
  each(stack, function (pass) {
    if (pass.shouldRun) return;
    pass.checkNode(node, scope);
  });
};

File.prototype.checkNode = function (node, scope) {
  var stack = this.transformerStack;
  scope = scope || this.scope;

  checkNode(stack, node, scope);

  scope.traverse(node, checkTransformerVisitor, {
    stack: stack
  });
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
  var i = 0;
  do {
    uid = this._generateUid(name, i);
    i++;
  } while (scope.hasReference(uid));
  return uid;
};

File.prototype.generateUidIdentifier = function (name, scope) {
  scope = scope || this.scope;
  var id = t.identifier(this.generateUid(name, scope));
  scope.addDeclarationToFunctionScope("var", id);
  return id;
};

File.prototype._generateUid = function (name, i) {
  var id = name;
  if (i > 1) id += i;
  return "_" + id;
};
