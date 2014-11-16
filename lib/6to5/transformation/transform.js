module.exports = transform;

var Transformer = require("./transformer");
var File        = require("../file");
var _           = require("lodash");

function transform(code, opts) {
  var file = new File(opts);
  return file.parse(code);
}

transform._ensureTransformerNames = function (type, keys) {
  _.each(keys, function (key) {
    if (!_.has(transform.transformers, key)) {
      throw new ReferenceError("unknown transformer " + key + " specified in " + type);
    }
  });
};

transform.transformers = {};

transform.moduleFormatters = {
  common: require("./modules/common"),
  ignore: require("./modules/ignore"),
  amd:    require("./modules/amd"),
  umd:    require("./modules/umd")
};

_.each({
  modules:                   require("./transformers/modules"),
  propertyNameShorthand:     require("./transformers/property-name-shorthand"),
  arrayComprehension:        require("./transformers/array-comprehension"),
  generatorComprehension:    require("./transformers/generator-comprehension"),
  arrowFunctions:            require("./transformers/arrow-functions"),
  classes:                   require("./transformers/classes"),

  _propertyLiterals:         require("./transformers/_property-literals"),
  computedPropertyNames:     require("./transformers/computed-property-names"),

  spread:                    require("./transformers/spread"),
  templateLiterals:          require("./transformers/template-literals"),
  propertyMethodAssignment:  require("./transformers/property-method-assignment"),
  defaultParameters:         require("./transformers/default-parameters"),
  restParameters:            require("./transformers/rest-parameters"),
  destructuring:             require("./transformers/destructuring"),
  forOf:                     require("./transformers/for-of"),
  unicodeRegex:              require("./transformers/unicode-regex"),

  constants:                 require("./transformers/constants"),
  letScoping:                require("./transformers/let-scoping"),

  react:                     require("./transformers/react"),

  _aliasFunctions:           require("./transformers/_alias-functions"),
  _blockHoist:               require("./transformers/_block-hoist"),
  _declarations:             require("./transformers/_declarations"),

  generators:                require("./transformers/generators"),
  useStrict:                 require("./transformers/use-strict"),

  _memberExpressionKeywords: require("./transformers/_member-expression-keywords"),
  _moduleFormatter:          require("./transformers/_module-formatter")
}, function (transformer, key) {
  transform.transformers[key] = new Transformer(key, transformer);
});
