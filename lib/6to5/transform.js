module.exports = transform;

var sourceMap = require("source-map");
var recast    = require("recast");
var File      = require("./file");
var util      = require("./util");
var _         = require("lodash");

function transform(code, opts) {
  opts = opts || {};
  code = (code || "") + "";

  var file = new File(opts);
  return util.parse(code);
}

transform.test = function (task, assert) {
  var actual = task.actual;
  var expect = task.expect;
  var opts   = task.options;

  opts.filename = actual.filename;

  var actualCode = actual.code.trim();

  var actualResult = transform(actualCode, opts);
  var actualAst    = actualResult.ast;
  actualCode       = recast.prettyPrint(actualAst).code;

  if (task.options.exec) {
    var fn = new Function("assert", actualCode);
    fn(assert);
  }

  var expectCode = expect.code.trim();

  if (!task.options.exec || (task.options.exec && expectCode)) {
    var expectAst    = util.parse(expect, expectCode);
    var expectResult = recast.prettyPrint(expectAst);
    expectCode       = expectResult.code;

    assert.equal(actualCode, expectCode);
  }

  if (task.sourceMap) {
    assert.deepEqual(task.sourceMap, actualResult.map);
  }

  if (task.sourceMappings) {
    var consumer = new sourceMap.SourceMapConsumer(actualResult.map);

    _.each(task.sourceMappings, function (mapping, i) {
      var pos = consumer.originalPositionFor(mapping.generated);
      var msg = "source mapping " + i + " - generated: " + mapping.generated.line + ":" + mapping.generated.column;
      assert.equal(pos.line + ":" + pos.column, mapping.original.line + ":" + mapping.original.column, msg);
    });
  }
};

transform._ensureTransformerNames = function (type, keys) {
  _.each(keys, function (key) {
    if (key[0] === "_" || !transform.transformers[key]) {
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
  generators:               require("./transformers/generators"),
  letScoping:               require("./transformers/let-scoping"),
  restParameters:           require("./transformers/rest-parameters"),
  destructuring:            require("./transformers/destructuring"),
  forOf:                    require("./transformers/for-of"),
  unicodeRegex:             require("./transformers/unicode-regex"),

  _aliasFunctions:          require("./transformers/_alias-functions")
};
