"use strict";

module.exports = File;

var sourceMapToComment = require("source-map-to-comment");
var shebangRegex       = require("shebang-regex");
var isFunction         = require("lodash/lang/isFunction");
var transform          = require("./index");
var generate           = require("../generation");
var defaults           = require("lodash/object/defaults");
var includes           = require("lodash/collection/includes");
var assign             = require("lodash/object/assign");
var parse              = require("../helpers/parse");
var Scope              = require("../traversal/scope");
var slash              = require("slash");
var util               = require("../util");
var path               = require("path");
var each               = require("lodash/collection/each");
var t                  = require("../types");

function File(opts) {
  this.dynamicImportedNoDefault = [];
  this.dynamicImportIds         = {};
  this.dynamicImported          = [];
  this.dynamicImports           = [];

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
  "to-consumable-array",
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
  "object-destructuring-empty",
  "temporal-undefined",
  "temporal-assert-defined",
  "self-global"
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
  "playground",
  "experimental",
  "externalHelpers",
  "auxiliaryComment",
  "compact",

  "resolveModuleSource",
  "moduleId",

  // legacy
  "format",

  // these are used by plugins
  "ignore",
  "only",
  "extensions",
  "accept"
];

File.prototype.normalizeOptions = function (opts) {
  opts = assign({}, opts);

  for (var key in opts) {
    if (key[0] !== "_" && File.validOptions.indexOf(key) < 0) {
      throw new ReferenceError("Unknown option: " + key);
    }
  }

  defaults(opts, {
    keepModuleIdExtensions: false,
    resolveModuleSource:    null,
    externalHelpers:        false,
    auxilaryComment:        "",
    experimental:           false,
    reactCompat:            false,
    playground:             false,
    moduleIds:              false,
    blacklist:              [],
    whitelist:              [],
    sourceMap:              false,
    optional:               [],
    comments:               true,
    filename:               "unknown",
    modules:                "common",
    compact:                "auto",
    loose:                  [],
    code:                   true,
    ast:                    true
  });

  // normalize windows path separators to unix
  opts.filename = slash(opts.filename);
  if (opts.sourceRoot) {
    opts.sourceRoot = slash(opts.sourceRoot);
  }

  if (opts.moduleId) {
    opts.moduleIds = true;
  }

  opts.basename = path.basename(opts.filename, path.extname(opts.filename));

  opts.blacklist = util.arrayify(opts.blacklist);
  opts.whitelist = util.arrayify(opts.whitelist);
  opts.optional  = util.arrayify(opts.optional);
  opts.compact   = util.booleanify(opts.compact);
  opts.loose     = util.arrayify(opts.loose);

  if (includes(opts.loose, "all") || includes(opts.loose, true)) {
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

  if (opts.externalHelpers) {
    this.set("helpersNamespace", t.identifier("babelHelpers"));
  }

  opts.blacklist = transform._ensureTransformerNames("blacklist", opts.blacklist);
  opts.whitelist = transform._ensureTransformerNames("whitelist", opts.whitelist);
  opts.optional  = transform._ensureTransformerNames("optional", opts.optional);
  opts.loose     = transform._ensureTransformerNames("loose", opts.loose);

  if (opts.reactCompat) {
    opts.optional.push("reactCompat");
    console.error("The reactCompat option has been moved into the optional transformer `reactCompat`");
  }

  var ensureEnabled = function (key) {
    var namespace = transform.transformerNamespaces[key];
    if (namespace === "es7") opts.experimental = true;
    if (namespace === "playground") opts.playground = true;
  };

  each(opts.whitelist, ensureEnabled);
  each(opts.optional, ensureEnabled);

  return opts;
};

File.prototype.isLoose = function (key) {
  return includes(this.opts.loose, key);
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

File.prototype.debug = function (msg) {
  var parts = this.opts.filename;
  if (msg) parts += ": " + msg;
  util.debug(parts);
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
  var shebangMatch = shebangRegex.exec(code);

  if (shebangMatch) {
    this.shebang = shebangMatch[0];

    // remove shebang
    code = code.replace(shebangRegex, "");
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

File.prototype.addImport = function (source, name, noDefault) {
  name = name || source;
  var id = this.dynamicImportIds[name];

  if (!id) {
    id = this.dynamicImportIds[name] = this.scope.generateUidIdentifier(name);

    var specifiers = [t.importSpecifier(t.identifier("default"), id)];
    var declar = t.importDeclaration(specifiers, t.literal(source));
    declar._blockHoist = 3;

    this.dynamicImported.push(declar);
    if (noDefault) this.dynamicImportedNoDefault.push(declar);

    this.moduleFormatter.importSpecifier(specifiers[0], declar, this.dynamicImports);
  }

  return id;
};

File.prototype.isConsequenceExpressionStatement = function (node) {
  return t.isExpressionStatement(node) && this.lastStatements.indexOf(node) >= 0;
};

File.prototype.attachAuxiliaryComment = function (node) {
  var comment = this.opts.auxiliaryComment;
  if (comment) {
    node.leadingComments = node.leadingComments || [];
    node.leadingComments.push({
      type: "Line",
      value: " " + comment
    });
  }
  return node;
};

File.prototype.addHelper = function (name) {
  if (!includes(File.helpers, name)) {
    throw new ReferenceError("Unknown helper " + name);
  }

  var program = this.ast.program;

  var declar = program._declarations && program._declarations[name];
  if (declar) return declar.id;

  var runtime = this.get("helpersNamespace");
  if (runtime) {
    name = t.identifier(t.toIdentifier(name));
    return t.memberExpression(runtime, name);
  } else {
    var ref = util.template(name);
    ref._compact = true;
    var uid = this.scope.generateUidIdentifier(name);
    this.scope.push({
      key: name,
      id: uid,
      init: ref
    });
    return uid;
  }
};

File.prototype.logDeopt = function () {
  // todo, (node, msg)
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
  opts.strictMode = this.transformers.useStrict.canRun();

  return parse(opts, code, function (tree) {
    self.transform(tree);
    return self.generate();
  });
};

File.prototype.transform = function (ast) {
  this.debug();

  this.ast = ast;
  this.lastStatements = t.getLastStatements(ast.program);
  this.scope = new Scope(ast.program, ast, null, this);

  var modFormatter = this.moduleFormatter = this.getModuleFormatter(this.opts.modules);
  if (modFormatter.init && this.transformers["es6.modules"].canRun()) {
    modFormatter.init();
  }

  this.checkNode(ast);

  this.call("pre");

  each(this.transformerStack, function (pass) {
    pass.transform();
  });

  this.call("post");
};

File.prototype.call = function (key) {
  var stack = this.transformerStack;
  for (var i = 0; i < stack.length; i++) {
    var transformer = stack[i].transformer;
    if (transformer[key]) {
      transformer[key](this);
    }
  }
};

var checkTransformerVisitor = {
  enter: function (node, parent, scope, state) {
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
    result.code += "\n" + sourceMapToComment(result.map);
    result.map = null;
  }

  return result;
};
