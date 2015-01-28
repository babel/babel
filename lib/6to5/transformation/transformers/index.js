module.exports = {
  useStrict:                               require("./other/use-strict"),

  "validation.undeclaredVariableCheck":    require("./validation/undeclared-variable-check"),
  "validation.noForInOfAssignment":        require("./validation/no-for-in-of-assignment"),
  "validation.setters":                    require("./validation/setters"),
  "spec.blockScopedFunctions":             require("./spec/block-scoped-functions"),

  "playground.malletOperator":             require("./playground/mallet-operator"),
  "playground.methodBinding":              require("./playground/method-binding"),
  "playground.memoizationOperator":        require("./playground/memoization-operator"),
  "playground.objectGetterMemoization":    require("./playground/object-getter-memoization"),

  react:                                   require("./other/react"),

  _modulesSplit:                           require("./internal/modules-split"),

  // needs to be before `regenerator` due to generator comprehensions
  // needs to be before `_aliasFunction`
  "es7.comprehensions":                    require("./es7/comprehensions"),

  // needs to be before `_aliasFunction`
  "es6.arrowFunctions":                    require("./es6/arrow-functions"),

  "es6.classes":                           require("./es6/classes"),

  asyncToGenerator:                        require("./other/async-to-generator"),
  bluebirdCoroutines:                      require("./other/bluebird-coroutines"),

  "es7.objectSpread":                      require("./es7/object-spread"),
  "es7.exponentiationOperator":            require("./es7/exponentiation-operator"),
  "es6.spread":                            require("./es6/spread"),
  "es6.templateLiterals":                  require("./es6/template-literals"),

  "es5.properties.mutators":               require("./es5/properties.mutators"),
  "es6.properties.shorthand":              require("./es6/properties.shorthand"),

  // needs to be before `_aliasFunction` due to define property closure
  "es6.properties.computed":               require("./es6/properties.computed"),

  "es6.forOf":                             require("./es6/for-of"),

  "es6.unicodeRegex":                      require("./es6/unicode-regex"),
  "es7.abstractReferences":                require("./es7/abstract-references"),

  "es6.constants":                         require("./es6/constants"),

  // needs to be before `_aliasFunction` due to block scopes sometimes being wrapped in a
  // closure
  "es6.blockScoping":                      require("./es6/block-scoping"),

  // needs to be after `es6.blockScoping` due to needing `letReferences` set on blocks
  "es6.blockScopingTDZ":                   require("./es6/block-scoping-tdz"),

  // needs to be after block scoping since regenerator doesn't support it
  regenerator:                             require("./other/regenerator"),

  "es6.parameters.default":                require("./es6/parameters.default"),
  "es6.parameters.rest":                   require("./es6/parameters.rest"),

  // needs to be before regenerator since regenerator doesn't know how to handle destructuring patterns
  "es6.destructuring":                     require("./es6/destructuring"),

  // needs to be after `regenerator` due to needing `regeneratorRuntime` references
  // needs to be after `es6.forOf` due to needing `Symbol.iterator` references
  // needs to be before `es6.modules` due to dynamic imports
  selfContained:                           require("./other/self-contained"),

  // needs to be before `_blockHoist` due to function hoisting etc
  "es6.modules":                           require("./es6/modules"),

  _blockHoist:                             require("./internal/block-hoist"),

  "spec.protoToAssign":                    require("./spec/proto-to-assign"),

  _declarations:                           require("./internal/declarations"),

  _aliasFunctions:                         require("./internal/alias-functions"),
  _moduleFormatter:                        require("./internal/module-formatter"),

  "spec.typeofSymbol":                     require("./spec/typeof-symbol"),
  "spec.undefinedToVoid":                  require("./spec/undefined-to-void"),

  "minification.propertyLiterals":         require("./minification/property-literals"),
  "minification.memberExpressionLiterals": require("./minification/member-expression-literals")
};
