if (!process.env.ALL_6TO5_TESTS) return;

var fs = require("fs");
var _  = require("lodash");

var traceurLoc = __dirname + "/../vendor/traceur";
if (!fs.existsSync(traceurLoc)) {
  console.error("No vendor/traceur - run `make bootstrap`");
  process.exit(1);
}

require("./_transformation-helper")({
  name: "traceur",
  loc: traceurLoc + "/test/feature",

  ignoreSuites: [
    // these are all internal traceur tests or non-standard features
    "ObjectMixin",
    "Annotations",
    "TestRunner",
    "Tools",
    "TempVarTransformer",
    "AtScript",
    "FreeVariableChecker",
    "TypeAssertions",
    "MemberVariables",
    "Types"
  ],

  ignoreTasks: [
    // core.js doesn't support due to a perf hit and having to override a lot
    // of native methods
    "Symbol/GetOwnPropertySymbols",

    // traceur doesn't name methods and has an incorrect test asserting that
    // they have no names
    "PropertyMethodAssignment/PropertyMethodAssignment",

    // 6to5 assumes that all code transformed is a module
    "Strict",
    "Syntax/UseStrictEscapeSequence",
    "Syntax/UseStrictLineContinuation",

    // experimental es7 - the spec hasn't been finalised yet
    // these both fail because of filter between blocks
    "ArrayComprehension/Simple",
    "GeneratorComprehension/Simple",

    // yield has been added as a keyword in ES6 so this test is actually incorrect
    "Yield/YieldIdentifier"
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
