var traverse = require("./traverse");
var assert   = require("assert");
var recast   = require("recast");
var path     = require("path");
var util     = require("./util");
var _        = require("lodash");

var ensureTransformerNames = function (type, keys) {
  _.each(keys, function (key) {
    if (!transform.transformers[key]) {
      throw new ReferenceError("unknown transformer " + key + " specified in " + type);
    }
  });
};

var transform = module.exports = function (code, opts) {
  opts = opts || {};
  code = (code || "") + "";

  _.defaults(opts, {
    blacklist: [],
    whitelist: [],
    sourceMap: false,
    filename:  "unknown",
    format:    {}
  });

  ensureTransformerNames("blacklist", opts.blacklist);
  ensureTransformerNames("whitelist", opts.whitelist);

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

  var result = util.generate(tree, opts);

  if (opts.sourceMap === "inline") {
    result.code += "\n" + util.sourceMapToComment(result.map);
  }

  return result;
};

transform._runTransformer = function (transformer, tree, opts, generateUid) {
  if (transformer.Program) transformer.Program(tree, opts);

  traverse.replace(tree, function (node, parent) {
    var fn = transformer[node.type] || transformer.all;
    if (!fn) return;

    return fn(node, parent, opts, generateUid);
  });
};

transform.test = function (task, assert) {
  var actual = task.actual;
  var expect = task.expect;
  var opts   = task.options;

  opts.filename = actual.filename;

  var actualCode = actual.code.trim();

  var transformedResult = transform(actualCode, opts);
  var transformedCode = transformedResult.code;

  var actualAst = util.parse(actual.filename, transformedCode);
  var actualResult = recast.prettyPrint(actualAst);
  actualCode = actualResult.code;

  var expectCode = expect.code.trim();
  var expectAst = util.parse(expect.filename, expectCode);
  var expectResult = recast.prettyPrint(expectAst);
  expectCode = expectResult.code;

  assert.equal(actualCode, expectCode);

  if (opts.sourceMap && task.sourceMap) {
    assert.deepEqual(util.formatJSON(transformedResult.map), util.formatJSON(task.sourceMap));
  }
};

transform.transformers = {
  modules:                  require("./transformers/modules"),
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
  generators:               require("./transformers/generators"),
  blockBinding:             require("./transformers/block-binding"),
  restParameters:           require("./transformers/rest-parameters"),
  destructuring:            require("./transformers/destructuring"),
  forOf:                    require("./transformers/for-of"),
  unicodeRegex:             require("./transformers/unicode-regex")
};
