require("./_helper").assertVendor("traceur");

var fs = require("fs");
var _  = require("lodash");

require("./_transformation-helper")({
  name: "traceur",
  loc: __dirname + "/../../vendor/traceur/test/feature",

  ignoreSuites: [
    // weird environmental issue make these hard to test
    "Modules",

    // these are the responsibility of regenerator
    "AsyncFunctions",
    "Yield",

    // these are the responsibility of core-js
    "StringExtras",
    "ArrayExtras",
    "Collections",

    // not supported
    "ProperTailCalls",
    "AsyncGenerators",

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
    // TODO
    "Syntax/StrictKeywordsInPattern",

    // babel has no way to check these :( TODO: add to caveats
    "TemplateLiterals/TemplateObjectCaching.module",

    // babel does function/class name inference which these tests don't take into consideration
    "Classes/ClassNameBinding",
    "PropertyMethodAssignment/PropertyMethodAssignment",

    // TODO: investigate
    "Classes/ExtendStrange",

    // these are the responsibility of core-js
    "Symbol/GetOwnPropertySymbols",
    "Spread/Type",
    "Symbol/ObjectModel",
    "Symbol/Inherited",
    "Symbol/Object",
    "Spread/NoIterator",
    "Destructuring/Rest",
    "Destructuring/Empty",

    // babel doesn't like non-closing comments :)
    "Syntax/NoNewLineHereEndOfFile",

    // traceur uses an old version of regexpu
    "RegularExpression/Simple",

    // class methods are still enumerable in traceur...
    "Classes/PrototypeDescriptor",
    "NumericLiteral/Simple",
    "Classes/Method",

    // Object.mixin didn't make it into ES6
    "ObjectMixin",

    // Babel assumes that all code transformed is a module so this isn't necessary
    "Strict",
    "Syntax/UseStrictEscapeSequence",
    "Syntax/UseStrictLineContinuation",

    // experimental es7 - the spec hasn't been finalized yet
    // these both fail because of filters between blocks
    "ArrayComprehension/Simple",
    "GeneratorComprehension/Simple",

    // yield has been added as a keyword in ES6
    "Yield/YieldIdentifier",
    "Syntax/StrictKeywords"
  ]
}, {
  optional: ["es6.spec.symbols", "es6.spec.templateLiterals"],
  stage: 0
}, function (opts, task) {
  if (!_.contains(task.exec.loc, "module.js")) {
    opts.blacklist = ["strict"];
  }
});
