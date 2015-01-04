var _ = require("lodash");

require("./_transformation-helper")({
  name: "traceur",
  loc: __dirname + "/../vendor/traceur/test/feature",

  ignoreSuites: [
    "ObjectMixin",
    "Annotations",
    "TestRunner",
    "Tools",
    "TempVarTransformer",
    "AtScript",
    "FreeVariableChecker",
    "TypeAssertions",
    "MemberVariables",
    "Types",

    // REENABLE THESE
    "Destructuring",
    "Syntax",
    "StringExtras",
    "Symbol",
    "Yield",
    "Modules",
    "Spread",
    "Scope",
    "GeneratorComprehension"
  ],

  ignoreTasks: [
    "Strict",

    // core.js doesn't support due to a perf hit and having to override a lot
    // of native methods
    "Symbol/GetOwnPropertySymbols",

    // Traceur doesn't name methods and has an incorrect test asserting that
    // they have no names
    "PropertyMethodAssignment/PropertyMethodAssignment"
  ]
}, {
  optional: ["typeofSymbol"],
  experimental: true,
  after: function () {
    // StringExtras/StarsWith
    delete Object.prototype[1];
  }
}, function (opts, task) {
  if (!_.contains(task.exec.loc, "module.js")) {
    opts.blacklist = ["useStrict"];
  }
});
