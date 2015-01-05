if (!process.env.ALL_6TO5_TESTS) return;

var fs = require("fs");
var _  = require("lodash");

var traceurLoc = __dirname + "/../vendor/traceur";
if (!fs.existsSync(traceurLoc)) {
  console.error("No vendor/traceur - run `git submodule update --init`");
  process.exit(1);
}

require("./_transformation-helper")({
  name: "traceur",
  loc: traceurLoc + "/test/feature",

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

    // the spec for these doesn't define syntax (as far as i could tell)
    // these both fail because of filter between blocks
    "ArrayComprehension/Simple",
    "GeneratorComprehension/Simple"
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
