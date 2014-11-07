module.exports = transform;

var Transformer = require("./transformer");
var File        = require("../file");
var _           = require("lodash");

function transform(code, opts) {
  opts = opts || {};
  code = (code || "") + "";

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

transform.transformers = {
  modules:                  require("./transformers/modules"),
  propertyNameShorthand:    require("./transformers/property-name-shorthand"),
  constants:                require("./transformers/constants"),
  arrayComprehension:       require("./transformers/array-comprehension"),
  arrowFunctions:           require("./transformers/arrow-functions"),
  classes:                  require("./transformers/classes"),

  _propertyLiterals:        require("./transformers/_property-literals"),
  computedPropertyNames:    require("./transformers/computed-property-names"),

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
  ignore: require("./modules/ignore"),
  amd:    require("./modules/amd"),
  umd:    require("./modules/umd")
};

_.each(transform.transformers, function (transformer, key) {
  transform.transformers[key] = new Transformer(key, transformer);
});
