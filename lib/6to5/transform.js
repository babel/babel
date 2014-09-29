var escodegen = require("escodegen");
var traverse  = require("./traverse");
var assert    = require("assert");
var util      = require("./util");
var _         = require("lodash");

var transform = module.exports = function (code, opts) {
  opts = opts || {};

  _.defaults(opts, {
    blacklist: [],
    whitelist: [],
    sourceMap: false,
    filename:  "unknown",
    format:    {}
  });

  var tree;

  try {
    tree = util.parse(code);
  } catch (err) {
    err.message = opts.filename + ": " + err.message;
    throw err;
  }

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
    comment: true,
    format: _.merge(opts.format, {
      indent: {
        style: "  "
      }
    })
  };

  if (opts.sourceMap) {
    genOpts.sourceMap = true;
    genOpts.sourceContent = code;
    genOpts.sourceMapWithCode = true;
  }

  var result = escodegen.generate(tree, genOpts);

  if (genOpts.sourceMapWithCode) {
    return result.code + "\n" + util.sourceMapToComment(result.map) + "\n";
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

transform.test = function (actual, expect, opts) {
  expect = [].concat(expect).join("\n");
  actual = [].concat(actual).join("\n");

  opts = opts || {};
  _.defaults(opts, { filename: "test" });

  actual = util.parse(transform(actual, opts));
  expect = util.parse(expect);

  try {
    assert.deepEqual(actual, expect);
  } catch (err) {
    actual = escodegen.generate(actual);
    expect = escodegen.generate(expect);
    assert.equal(actual, expect);
  }
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
  destructuringAssignment:  require("./transformers/destructuring-assignment"),
  generators:               require("./transformers/generators"),
  blockBinding:             require("./transformers/block-binding"),
  modules:                  require("./transformers/modules"),
  restParameters:           require("./transformers/rest-parameters"),
  iterators:                require("./transformers/iterators")
};
