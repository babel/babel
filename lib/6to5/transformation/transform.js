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
      throw new ReferenceError(
        "Unknown transformer " + key + " specified in " + type + " - " +
        "transformer key names have been changed in 3.0.0 see " +
        "the changelog for more info " +
        "https://github.com/6to5/6to5/blob/master/CHANGELOG.md#300"
      );
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

  // needs to be before `_blockHoist` due to function hoisting etc
  "es6.modules":                      require("./transformers/es6/modules"),

  // needs to be before `regenerator` due to generator comprehensions
  // needs to be before `_aliasFunction`
  "es7.comprehensions":               require("./transformers/es7/comprehensions"),

  // needs to be before `_aliasFunction`
  "es6.arrowFunctions":               require("./transformers/es6/arrow-functions"),

  "es6.classes":                      require("./transformers/es6/classes"),

  "es7.objectSpread":                 require("./transformers/es7/object-spread"),
  "es7.exponentiationOperator":       require("./transformers/es7/exponentiation-operator"),
  "es6.spread":                       require("./transformers/es6/spread"),
  "es6.templateLiterals":             require("./transformers/es6/template-literals"),

  "es5.properties.mutators":          require("./transformers/es5/properties.mutators"),
  "es6.properties.shorthand":         require("./transformers/es6/properties.shorthand"),

  // needs to be before `_aliasFunction` due to define property closure
  "es6.properties.computed":          require("./transformers/es6/properties.computed"),

  "es6.forOf":                        require("./transformers/es6/for-of"),

  "es6.unicodeRegex":                 require("./transformers/es6/unicode-regex"),
  "es7.abstractReferences":           require("./transformers/es7/abstract-references"),

  "es6.constants":                    require("./transformers/es6/constants"),

  // needs to be before `_aliasFunction` due to block scopes sometimes being wrapped in a
  // closure
  "es6.blockScoping":                 require("./transformers/es6/block-scoping"),

  // needs to be after `es6.blockScoping` due to needing `letReferences` set on blocks
  "optional.blockScopingTDZ":         require("./transformers/optional/block-scoping-tdz"),

  // needs to before `forOf` because otherwise regenerator wont be able to explode them
  // needs to be after block scoping since regenerator doesn't support it
  regenerator:                        require("./transformers/other/regenerator"),

  "es6.parameters.default":           require("./transformers/es6/parameters.default"),
  "es6.parameters.rest":              require("./transformers/es6/parameters.rest"),

  "es6.destructuring":                require("./transformers/es6/destructuring"),

  // needs to be after `regenerator` due to needing `regeneratorRuntime` references
  // needs to be after `es6.forOf` due to needing `Symbol.iterator` references
  // needs to be before `es6.modules` due to dynamic imports
  "optional.selfContained":           require("./transformers/optional/self-contained"),

  _blockHoist:                        require("./transformers/_block-hoist"),

  "optional.protoToAssign":           require("./transformers/optional/proto-to-assign"),

  _declarations:                      require("./transformers/_declarations"),

  useStrict:                          require("./transformers/other/use-strict"),

  _aliasFunctions:                    require("./transformers/_alias-functions"),
  _moduleFormatter:                   require("./transformers/_module-formatter"),

  "optional.typeofSymbol":            require("./transformers/optional/typeof-symbol"),
  "optional.undefinedToVoid":         require("./transformers/optional/undefined-to-void"),
  "optional.undeclaredVariableCheck": require("./transformers/optional/undeclared-variable-check"),

  "spec.propertyLiterals":            require("./transformers/spec/property-literals"),
  "spec.memberExpressionLiterals":    require("./transformers/spec/member-expression-literals")
}, function (transformer, key) {
  transform.transformers[key] = new Transformer(key, transformer);
});
