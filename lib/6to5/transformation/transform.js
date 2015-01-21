"use strict";

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
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!_.has(transform.transformers, key)) {
      throw new ReferenceError("unknown transformer " + key + " specified in " + type);
    }
  }
};

transform.transformers = {};

transform.moduleFormatters = {
  commonStrict: require("./modules/common-strict"),
  umdStrict:    require("./modules/umd-strict"),
  amdStrict:    require("./modules/amd-strict"),
  common:       require("./modules/common"),
  system:       require("./modules/system"),
  ignore:       require("./modules/ignore"),
  amd:          require("./modules/amd"),
  umd:          require("./modules/umd")
};

_.each({
  specNoForInOfAssignment:   require("./transformers/spec/no-for-in-of-assignment"),
  specSetters:               require("./transformers/spec/setters"),
  specBlockScopedFunctions:  require("./transformers/spec/block-scoped-functions"),

  malletOperator:            require("./transformers/playground/mallet-operator"),
  methodBinding:             require("./transformers/playground/method-binding"),
  memoizationOperator:       require("./transformers/playground/memoization-operator"),
  objectGetterMemoization:   require("./transformers/playground/object-getter-memoization"),

  asyncToGenerator:          require("./transformers/optional/async-to-generator"),
  bluebirdCoroutines:        require("./transformers/optional/bluebird-coroutines"),

  react:                     require("./transformers/other/react"),
  modules:                   require("./transformers/es6/modules"),
  comprehensions:            require("./transformers/es7/comprehensions"),
  arrowFunctions:            require("./transformers/es6/arrow-functions"),
  classes:                   require("./transformers/es6/classes"),

  objectSpread:              require("./transformers/es7/object-spread"),
  exponentiationOperator:    require("./transformers/es7/exponentiation-operator"),
  spread:                    require("./transformers/es6/spread"),
  templateLiterals:          require("./transformers/es6/template-literals"),

  "properties.mutators":     require("./transformers/es5/properties.mutators"),
  "properties.shorthand":    require("./transformers/es6/properties.shorthand"),
  "properties.computed":     require("./transformers/es6/properties.computed"),

  "parameters.default":      require("./transformers/es6/parameters.default"),
  "parameters.rest":         require("./transformers/es6/parameters.rest"),

  destructuring:             require("./transformers/es6/destructuring"),
  forOf:                     require("./transformers/es6/for-of"),
  unicodeRegex:              require("./transformers/es6/unicode-regex"),
  abstractReferences:        require("./transformers/es7/abstract-references"),

  constants:                 require("./transformers/es6/constants"),
  blockScoping:              require("./transformers/es6/block-scoping"),
  blockScopingTDZ:           require("./transformers/optional/block-scoping-tdz"),

  _blockHoist:               require("./transformers/_block-hoist"),

  generators:                require("./transformers/es6/generators"),

  protoToAssign:             require("./transformers/optional/proto-to-assign"),

  _declarations:             require("./transformers/_declarations"),

  // wrap up
  useStrict:                 require("./transformers/other/use-strict"),
  _aliasFunctions:           require("./transformers/_alias-functions"),
  _moduleFormatter:          require("./transformers/_module-formatter"),

  typeofSymbol:              require("./transformers/optional/typeof-symbol"),
  selfContained:             require("./transformers/optional/self-contained"),
  undefinedToVoid:           require("./transformers/optional/undefined-to-void"),
  undeclaredVariableCheck:   require("./transformers/optional/undeclared-variable-check"),

  // spec
  specPropertyLiterals:         require("./transformers/spec/property-literals"),
  specMemberExpressionLiterals: require("./transformers/spec/member-expression-literals")
}, function (transformer, key) {
  transform.transformers[key] = new Transformer(key, transformer);
});
