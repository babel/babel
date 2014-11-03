module.exports = transform;

var Transformer = require("./transformer");
var sourceMap   = require("source-map");
var generate    = require("./generator");
var File        = require("./file");
var util        = require("./util");
var _           = require("lodash");

function transform(code, opts) {
  opts = opts || {};
  code = (code || "") + "";

  var file = new File(opts);
  return file.parse(code);
}

transform.test = function (task, assert) {
  var actual = task.actual;
  var expect = task.expect;
  var opts   = task.options;
  var exec   = task.exec;

  var getOpts = function (filename) {
    return _.merge({
      whtiespace: true,
      filename: filename
    }, opts);
  };

  var execCode = exec.code.trim();
  var result;

  if (execCode) {
    result = transform(execCode, getOpts(exec.filename));
    execCode = result.code;

    require("./polyfill");

    try {
      var fn = new Function("assert", execCode);
      fn(assert);
    } catch (err) {
      err.message += util.codeFrame(execCode);
      throw err;
    }
  } else {
    var actualCode = actual.code.trim();
    var expectCode = expect.code.trim();

    result     = transform(actualCode, getOpts(actual.filename));
    actualCode = result.code;

    try {
      assert.equal(actualCode, expectCode);
    } catch (err) {
      err.showDiff = true;
      throw err;
    }
  }

  if (task.sourceMap) {
    assert.deepEqual(task.sourceMap, result.map);
  }

  if (task.sourceMappings) {
    var consumer = new sourceMap.SourceMapConsumer(result.map);

    _.each(task.sourceMappings, function (mapping, i) {
      var expect = mapping.original;

      var actual = consumer.originalPositionFor(mapping.generated);
      assert.equal(actual.line + ":" + actual.column, expect.line + ":" + expect.column);
    });
  }
};

transform._ensureTransformerNames = function (type, keys) {
  _.each(keys, function (key) {
    if (!_.has(transform.transformers, key)) {
      throw new ReferenceError("unknown transformer " + key + " specified in " + type);
    }
  });
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
  restParameters:           require("./transformers/rest-parameters"),
  destructuring:            require("./transformers/destructuring"),
  letScoping:               require("./transformers/let-scoping"),
  forOf:                    require("./transformers/for-of"),
  unicodeRegex:             require("./transformers/unicode-regex"),
  generators:               require("./transformers/generators"),
  numericLiterals:          require("./transformers/numeric-literals"),

  react:                    require("./transformers/react"),
  jsx:                      require("./transformers/jsx"),

  _aliasFunctions:          require("./transformers/_alias-functions"),
  _blockHoist:              require("./transformers/_block-hoist"),
  _declarations:            require("./transformers/_declarations"),

  useStrict:                require("./transformers/use-strict"),

  _moduleFormatter:         require("./transformers/_module-formatter")
};

transform.moduleFormatters = {
  common: require("./modules/common"),
  amd:    require("./modules/amd"),
  umd:    require("./modules/umd")
};

_.each(transform.transformers, function (transformer, key) {
  transform.transformers[key] = new Transformer(key, transformer);
});
