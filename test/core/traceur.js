require("./_helper").assertVendor("traceur");

var fs = require("fs");
var _  = require("lodash");

require("./_transformation-helper")({
  name: "traceur",
  loc: __dirname + "/../../vendor/traceur/test/feature",

  ignoreSuites: [
    // weird environmental issue make these hard to test
    "Modules",

    // not supported
    "ProperTailCalls",

    // uses the old async generator proposal
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
    // non-standard
    "ObjectMixin",

    // TODO
    "Yield/GeneratorSend",
    "Yield/BreakForOf",
    "Yield/GeneratorThrow",
    "Yield/ObjectModel",
    "Yield/ReturnGenerator",

    // TODO: core-js fails these
    "Collections/Map",
    "Collections/Set",
    "ArrayExtras/From",
    "ArrayExtras/FindIndex",
    "ArrayExtras/Find",
    "StringExtras/Includes",
    "StringExtras/EndsWith",

    // this tests pollutes Object.prototype which messes things up
    "StringExtras/StartsWith",

    // TODO
    "Syntax/IsValidSimpleAssignmentTarget",

    // babel has no way to check these :( TODO: add to caveats
    "TemplateLiterals/TemplateObjectCaching.module",

    // babel does function/class name inference which these tests don't take into consideration
    "Classes/ClassNameBinding",
    "PropertyMethodAssignment/PropertyMethodAssignment",

    // TODO: investigate
    "Classes/ExtendStrange",

    // these are the responsibility of core-js
    "Spread/Type",
    "Symbol/Inherited",
    "Spread/NoIterator",
    "Destructuring/Rest",
    "Destructuring/Empty",

    // babel doesn't like non-closing comments :)
    "Syntax/NoNewLineHereEndOfFile",

    // TODO
    "Classes/PrototypeDescriptor",

    // Babel assumes that all code transformed is a module so this isn't necessary
    "Strict",
    "Syntax/UseStrictEscapeSequence",
    "Syntax/UseStrictLineContinuation",
    "ObjectInitializerShorthand/StrictKeyword",

    // experimental es7 - the spec hasn't been finalized yet
    // these both fail because of filters between blocks
    "ArrayComprehension/Simple",
    "GeneratorComprehension/Simple",

    // yield has been added as a keyword in ES6
    "Syntax/StrictKeywordsInPattern",
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
