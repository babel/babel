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
  "spec.noForInOfAssignment":           require("./transformers/spec/no-for-in-of-assignment"),
  "spec.setters":                       require("./transformers/spec/setters"),
  "spec.blockScopedFunctions":          require("./transformers/spec/block-scoped-functions"),

  "playground.malletOperator":          require("./transformers/playground/mallet-operator"),
  "playground.methodBinding":           require("./transformers/playground/method-binding"),
  "playground.memoizationOperator":     require("./transformers/playground/memoization-operator"),
  "playground.objectGetterMemoization": require("./transformers/playground/object-getter-memoization"),

  "optional.asyncToGenerator":        require("./transformers/optional/async-to-generator"),
  "optional.bluebirdCoroutines":      require("./transformers/optional/bluebird-coroutines"),

  react:                              require("./transformers/other/react"),

  "es6.modules":                      require("./transformers/es6/modules"),
  "es7.comprehensions":               require("./transformers/es7/comprehensions"),
  "es6.arrowFunctions":               require("./transformers/es6/arrow-functions"),
  "es6.classes":                      require("./transformers/es6/classes"),

  "es7.objectSpread":                 require("./transformers/es7/object-spread"),
  "es7.exponentiationOperator":       require("./transformers/es7/exponentiation-operator"),
  "es6.spread":                       require("./transformers/es6/spread"),
  "es6.templateLiterals":             require("./transformers/es6/template-literals"),

  "es5.properties.mutators":          require("./transformers/es5/properties.mutators"),
  "es6.properties.shorthand":         require("./transformers/es6/properties.shorthand"),
  "es6.properties.computed":          require("./transformers/es6/properties.computed"),

  "es6.parameters.default":           require("./transformers/es6/parameters.default"),
  "es6.parameters.rest":              require("./transformers/es6/parameters.rest"),

  "es6.destructuring":                require("./transformers/es6/destructuring"),
  "es6.forOf":                        require("./transformers/es6/for-of"),
  "es6.unicodeRegex":                 require("./transformers/es6/unicode-regex"),
  "es7.abstractReferences":           require("./transformers/es7/abstract-references"),

  "es6.constants":                    require("./transformers/es6/constants"),
  "es6.blockScoping":                 require("./transformers/es6/block-scoping"),
  "optional.blockScopingTDZ":         require("./transformers/optional/block-scoping-tdz"),

  _blockHoist:                        require("./transformers/_block-hoist"),

  "es6.generators":                   require("./transformers/es6/generators"),
  "optional.protoToAssign":           require("./transformers/optional/proto-to-assign"),

  _declarations:                      require("./transformers/_declarations"),

  useStrict:                          require("./transformers/other/use-strict"),

  _aliasFunctions:                    require("./transformers/_alias-functions"),
  _moduleFormatter:                   require("./transformers/_module-formatter"),

  "optional.typeofSymbol":            require("./transformers/optional/typeof-symbol"),
  "optional.selfContained":           require("./transformers/optional/self-contained"),
  "optional.undefinedToVoid":         require("./transformers/optional/undefined-to-void"),
  "optional.undeclaredVariableCheck": require("./transformers/optional/undeclared-variable-check"),

  "spec.propertyLiterals":            require("./transformers/spec/property-literals"),
  "spec.memberExpressionLiterals":    require("./transformers/spec/member-expression-literals")
}, function (transformer, key) {
  transform.transformers[key] = new Transformer(key, transformer);
});
