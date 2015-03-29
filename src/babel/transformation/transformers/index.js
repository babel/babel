export default {
  "es7.classProperties":                   require("./es7/class-properties"),
  "es7.asyncFunctions":                    require("./es7/async-functions"),
  "es7.decorators":                        require("./es7/decorators"),

  strict:                                  require("./other/strict"),

  _validation:                             require("./internal/validation"),

  "validation.undeclaredVariableCheck":    require("./validation/undeclared-variable-check"),
  "validation.react":                      require("./validation/react"),

  // this goes at the start so we only transform the original user code
  "spec.functionName":                     require("./spec/function-name"),

  // needs to be before `_shadowFunctions`
  "es6.arrowFunctions":                    require("./es6/arrow-functions"),

  "spec.blockScopedFunctions":             require("./spec/block-scoped-functions"),

  "optimisation.react.constantElements":   require("./optimisation/react.constant-elements"),
  reactCompat:                             require("./other/react-compat"),
  react:                                   require("./other/react"),

  _modules:                                require("./internal/modules"),

  // needs to be before `regenerator` due to generator comprehensions
  // needs to be before `_shadowFunctions`
  "es7.comprehensions":                    require("./es7/comprehensions"),

  "es6.classes":                           require("./es6/classes"),

  asyncToGenerator:                        require("./other/async-to-generator"),
  bluebirdCoroutines:                      require("./other/bluebird-coroutines"),

  "es6.objectSuper":                       require("./es6/object-super"),
  "es7.objectRestSpread":                  require("./es7/object-rest-spread"),
  "es7.exponentiationOperator":            require("./es7/exponentiation-operator"),
  "es6.templateLiterals":                  require("./es6/template-literals"),

  "es5.properties.mutators":               require("./es5/properties.mutators"),
  "es6.properties.shorthand":              require("./es6/properties.shorthand"),

  // needs to be before `_shadowFunctions` due to define property closure
  "es6.properties.computed":               require("./es6/properties.computed"),

  "optimisation.flow.forOf":               require("./optimisation/flow.for-of"),
  "es6.forOf":                             require("./es6/for-of"),

  "es6.regex.sticky":                      require("./es6/regex.sticky"),
  "es6.regex.unicode":                     require("./es6/regex.unicode"),

  "es6.constants":                         require("./es6/constants"),

  // needs to be before `es6.parameters.default` as default parameters will destroy the rest param
  "es6.parameters.rest":                   require("./es6/parameters.rest"),

  // needs to be after `es6.parameters.rest` as we use `toArray` and avoid turning an already known array into one
  "es6.spread":                            require("./es6/spread"),

  // needs to be before `es6.blockScoping` as default parameters have a TDZ
  "es6.parameters.default":                require("./es6/parameters.default"),

  // needs to be before `es6.blockScoping` as let variables may be produced
  "es6.destructuring":                     require("./es6/destructuring"),

  // needs to be before `_shadowFunctions` due to block scopes sometimes being wrapped in a
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
  runtime:                                require("./other/runtime"),

  // needs to be before `_blockHoist` due to function hoisting etc
  "es6.modules":                           require("./es6/modules"),

  _blockHoist:                             require("./internal/block-hoist"),

  "spec.protoToAssign":                    require("./spec/proto-to-assign"),

  _declarations:                           require("./internal/declarations"),

  _shadowFunctions:                        require("./internal/shadow-functions"),

  "es7.doExpressions":                     require("./es7/do-expressions"),

  "es6.symbols":                           require("./es6/symbols"),
  "spec.undefinedToVoid":                  require("./spec/undefined-to-void"),

  _strict:                                 require("./internal/strict"),
  _moduleFormatter:                        require("./internal/module-formatter"),

  "es3.propertyLiterals":                  require("./es3/property-literals"),
  "es3.memberExpressionLiterals":          require("./es3/member-expression-literals"),

  "utility.removeDebugger":                require("./utility/remove-debugger"),
  "utility.removeConsole":                 require("./utility/remove-console"),

  "utility.inlineEnvironmentVariables":    require("./utility/inline-environment-variables"),
  "utility.inlineExpressions":             require("./utility/inline-expressions"),
  "utility.deadCodeElimination":           require("./utility/dead-code-elimination"),

  flow:                                    require("./other/flow"),
  _cleanUp:                                require("./internal/cleanup")
};
