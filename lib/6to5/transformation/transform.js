module.exports = transform;

var Transformer = require("./transformer");
var File        = require("../file");
var util        = require("../util");
var _           = require("lodash");

function transform(code, opts) {
  var file = new File(opts);
  return file.parse(code);
}

transform.fromAst = function (ast, code, opts) {
  ast = util.normaliseAst(ast);

  var file = new File(opts);
  file.addCode(code);
  file.transform(ast);
  return file.generate();
};

transform._ensureTransformerNames = function (type, keys) {
  for (var i in keys) {
    var key = keys[i];
    if (!_.has(transform.transformers, key)) {
      throw new ReferenceError("unknown transformer " + key + " specified in " + type);
    }
  }
};

transform.transformers = {};

transform.moduleFormatters = {
  common: require("./modules/common"),
  system: require("./modules/system"),
  ignore: require("./modules/ignore"),
  amd:    require("./modules/amd"),
  umd:    require("./modules/umd")
};

_.each({
  // spec
  specBlockHoistFunctions:   require("./transformers/spec-block-hoist-functions"),
  specNoForInOfAssignment:   require("./transformers/spec-no-for-in-of-assignment"),
  specNoDuplicateProperties: require("./transformers/spec-no-duplicate-properties"),

  // playground
  methodBinding:             require("./transformers/playground-method-binding"),
  memoizationOperator:       require("./transformers/playground-memoization-operator"),
  objectGetterMemoization:   require("./transformers/playground-object-getter-memoization"),

  asyncToGenerator:          require("./transformers/optional-async-to-generator"),
  bluebirdCoroutines:        require("./transformers/optional-bluebird-coroutines"),

  react:                     require("./transformers/react"),
  modules:                   require("./transformers/es6-modules"),
  propertyNameShorthand:     require("./transformers/es6-property-name-shorthand"),
  arrayComprehension:        require("./transformers/es7-array-comprehension"),
  generatorComprehension:    require("./transformers/es7-generator-comprehension"),
  arrowFunctions:            require("./transformers/es6-arrow-functions"),
  classes:                   require("./transformers/es6-classes"),

  computedPropertyNames:     require("./transformers/es6-computed-property-names"),

  objectSpread:              require("./transformers/es7-object-spread"),
  exponentiationOperator:    require("./transformers/es7-exponentiation-operator"),
  spread:                    require("./transformers/es6-spread"),
  templateLiterals:          require("./transformers/es6-template-literals"),
  propertyMethodAssignment:  require("./transformers/es5-property-method-assignment"),
  destructuring:             require("./transformers/es6-destructuring"),
  defaultParameters:         require("./transformers/es6-default-parameters"),
  forOf:                     require("./transformers/es6-for-of"),
  unicodeRegex:              require("./transformers/es6-unicode-regex"),
  abstractReferences:        require("./transformers/es7-abstract-references"),

  constants:                 require("./transformers/es6-constants"),
  letScoping:                require("./transformers/es6-let-scoping"),

  _blockHoist:               require("./transformers/_block-hoist"),

  generators:                require("./transformers/es6-generators"),
  restParameters:            require("./transformers/es6-rest-parameters"),

  _declarations:             require("./transformers/_declarations"),

  coreAliasing:              require("./transformers/optional-core-aliasing"),
  undefinedToVoid:           require("./transformers/optional-undefined-to-void"),

  // wrap up
  _aliasFunctions:           require("./transformers/_alias-functions"),
  _moduleFormatter:          require("./transformers/_module-formatter"),
  useStrict:                 require("./transformers/use-strict"),

  // spec
  specPropertyLiterals:         require("./transformers/spec-property-literals"),
  specMemberExpressionLiterals: require("./transformers/spec-member-expression-literals")
}, function (transformer, key) {
  transform.transformers[key] = new Transformer(key, transformer);
});
