var traverse = require("./traverse");
var assert   = require("assert");
var path     = require("path");
var util     = require("./util");
var _        = require("lodash");

var transform = module.exports = function (code, opts) {
  opts = opts || {};

  _.defaults(opts, {
    sourceMapObject: false,
    blacklist:       [],
    whitelist:       [],
    sourceMap:       false,
    filename:        "unknown",
    format:          {}
  });

  if (opts.sourceMapObject) opts.sourceMap = true;

  return util.parse(opts.filename, code, function (tree) {
    return transform._run(code, tree, opts);
  });
};

transform._run = function (code, tree, opts) {
  traverse.replace(tree, function (node) {
    if (node.type === "EmptyStatement") {
      return traverse.Delete;
    }
  });

  var generateUid = util.buildUidGenerator();

  _.each(transform.transformers, function (transformer, name) {
    var blacklist = opts.blacklist;
    if (blacklist.length && _.contains(blacklist, name)) return;

    var whitelist = opts.whitelist;
    if (whitelist.length && !_.contains(whitelist, name)) return;

    transform._runTransformer(transformer, tree, opts, generateUid);
  });

  var genOpts = {
    format: opts.format
  };

  if (opts.sourceMap) {
    genOpts.sourceMap = path.basename(opts.filename);
    genOpts.sourceContent = code;
    genOpts.sourceMapWithCode = true;
  }

  var result = util.generate(tree, genOpts);

  if (opts.sourceMap) {
    if (opts.sourceMapObject) {
      return result;
    } else {
      return result.code + "\n" + util.sourceMapToComment(result.map) + "\n";
    }
  } else {
    return result + "\n";
  }
};

transform._runTransformer = function (transformer, tree, opts, generateUid) {
  if (transformer.Program) transformer.Program(tree, opts);

  traverse.replace(tree, function (node, parent) {
    var fn = transformer[node.type] || transformer.all;
    if (!fn) return;

    return fn(node, parent, opts, generateUid);
  });
};

transform.test = function (actual, expect, opts, debug) {
  opts = opts || {};
  _.defaults(opts, { filename: "test" });

  var actualCode = actual.code.trim();
  var transformedCode = transform(actualCode, opts);
  var actualAst = util.parse(actual.filename, transformedCode);
  actualCode = util.generate(actualAst);

  var expectCode = expect.code.trim();
  var expectAst = util.parse(expect.filename, expectCode);
  expectCode = util.generate(expectAst);

  assert.equal(actualCode, expectCode);
};

transform.transformers = {
  computedPropertyNames:    require("./transformers/computed-property-names"),
  propertyNameShorthand:    require("./transformers/property-name-shorthand"),
  constants:                require("./transformers/constants"),
  arrayComprehension:       require("./transformers/array-comprehension"),
  arrowFunctions:           require("./transformers/arrow-functions"),
  classes:                  require("./transformers/classes"),
  spread:                   require("./transformers/spread"),
  templateLiterals:         require("./transformers/template-literals"),
  propertyMethodAssignment: require("./transformers/property-method-assignment"),
  defaultParameters:        require("./transformers/default-parameters"),
  destructuring:            require("./transformers/destructuring"),
  generators:               require("./transformers/generators"),
  blockBinding:             require("./transformers/block-binding"),
  modules:                  require("./transformers/modules"),
  restParameters:           require("./transformers/rest-parameters"),
  forOf:                    require("./transformers/for-of")
};
