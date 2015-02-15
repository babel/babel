module.exports = {
  useStrict:                               require("./other/use-strict"),

  "validation.undeclaredVariableCheck":    require("./validation/undeclared-variable-check"),
  "validation.noForInOfAssignment":        require("./validation/no-for-in-of-assignment"),
  "validation.setters":                    require("./validation/setters"),
  "validation.react":                      require("./validation/react"),
  "spec.blockScopedFunctions":             require("./spec/block-scoped-functions"),

  "playground.malletOperator":             require("./playground/mallet-operator"),
  "playground.methodBinding":              require("./playground/method-binding"),
  "playground.memoizationOperator":        require("./playground/memoization-operator"),
  "playground.objectGetterMemoization":    require("./playground/object-getter-memoization"),

  reactCompat:                             require("./other/react-compat"),
  flow:                                    require("./other/flow"),
  react:                                   require("./other/react"),

  _modules:                                require("./internal/modules"),

  // needs to be before `regenerator` due to generator comprehensions
  // needs to be before `_aliasFunction`
  "es7.comprehensions":                    require("./es7/comprehensions"),

  // needs to be before `_aliasFunction`
  "es6.arrowFunctions":                    require("./es6/arrow-functions"),

  "es6.classes":                           require("./es6/classes"),

  asyncToGenerator:                        require("./other/async-to-generator"),
  bluebirdCoroutines:                      require("./other/bluebird-coroutines"),

  "es6.objectSuper":                       require("./es6/object-super"),
  "es7.objectRestSpread":                  require("./es7/object-rest-spread"),
  "es7.exponentiationOperator":            require("./es7/exponentiation-operator"),
  "es6.templateLiterals":                  require("./es6/template-literals"),

  "es5.properties.mutators":               require("./es5/properties.mutators"),
  "es6.properties.shorthand":              require("./es6/properties.shorthand"),

  // needs to be before `_aliasFunction` due to define property closure
  "es6.properties.computed":               require("./es6/properties.computed"),

  "es6.forOf":                             require("./es6/for-of"),

  "es6.unicodeRegex":                      require("./es6/unicode-regex"),
  "es7.abstractReferences":                require("./es7/abstract-references"),

  "es6.constants":                         require("./es6/constants"),

  // needs to be before `es6.parameters.default` as default parameters will destroy the rest param
  "es6.parameters.rest":                   require("./es6/parameters.rest"),

  // needs to be after `es6.parameters.rest` as we use `toArray` and avoid turning an already known array into one
  "es6.spread":                            require("./es6/spread"),

  // needs to be before `es6.blockScoping` as default parameters have a TDZ
  "es6.parameters.default":                require("./es6/parameters.default"),

  // needs to be before `es6.blockScoping` as let variables may be produced
  "es6.destructuring":                     require("./es6/destructuring"),

  // needs to be before `_aliasFunction` due to block scopes sometimes being wrapped in a
  // closure
  "es6.blockScoping":                      require("./es6/block-scoping"),

  // needs to be after `es6.blockScoping` due to needing `letReferences` set on blocks
  "es6.blockScopingTDZ":                   require("./es6/block-scoping-tdz"),

  // needs to be after `es6.parameters.*` and `es6.blockScoping` due to needing pure
  // identifiers in parameters and variable declarators
  "es6.tailCall":                          require("./es6/tail-call"),

  regenerator:                             require("./other/regenerator"),

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

  "spec.typeofSymbol":                     require("./spec/typeof-symbol"),
  "spec.undefinedToVoid":                  require("./spec/undefined-to-void"),
  "spec.functionName":                     require("./spec/function-name"),

  _moduleFormatter:                        require("./internal/module-formatter"),

  "es3.propertyLiterals":                  require("./es3/property-literals"),
  "es3.memberExpressionLiterals":          require("./es3/member-expression-literals"),

  "minification.removeDebugger":           require("./minification/remove-debugger"),
  "minification.removeConsoleCalls":       require("./minification/remove-console-calls"),
  "minification.deadCodeElimination":      require("./minification/dead-code-elimination"),
  "minification.renameLocalVariables":     require("./minification/rename-local-variables"),

  _cleanUp:                                require("./internal/cleanup")
};
