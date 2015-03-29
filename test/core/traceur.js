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

    // broken test, see google/traceur-compiler#1797
    "Classes/NestedClassSuperAnimal",

    // TODO: #426
    "Classes/SuperUnary",
    "Classes/SuperPostfix",

    // TODO: investigate
    "Classes/SuperSet",
    "Classes/PrototypeDescriptor",
    "Classes/ExtendStrange",
    "Classes/ClassNameBinding",

    // these are the responsibility of core-js
    "Symbol/GetOwnPropertySymbols",
    "Spread/Type",
    "Symbol/ObjectModel",
    "Symbol/Inherited",
    "Symbol/Object",
    "Spread/NoIterator",
    "Destructuring/Rest",
    "Destructuring/Empty",

    // traceur uses an old version of regexpu
    "RegularExpression/Simple",

    // class methods are still enumerable in traceur
    "NumericLiteral/Simple",
    "Classes/Method",

    // Object.mixin didn't make it into ES6
    "ObjectMixin",

    // traceur doesn't name methods and has an incorrect test asserting that
    // they have no names
    "PropertyMethodAssignment/PropertyMethodAssignment",

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
  optional: ["es6.symbols"],
  stage: 0
}, function (opts, task) {
  if (!_.contains(task.exec.loc, "module.js")) {
    opts.blacklist = ["strict"];
  }
});
