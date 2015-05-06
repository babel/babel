var babelEslint = require("..");
var espree      = require("espree");
var util        = require("util");

// Checks if the source ast implements the target ast. Ignores extra keys on source ast
function assertImplementsAST(target, source, path) {
  if (!path) {
    path = [];
  }

  function error(text) {
    var err = new Error("At " + path.join(".") + ": " + text + ":");
    err.depth = path.length + 1;
    throw err;
  }

  var typeA = target === null ? "null" : typeof target;
  var typeB = source === null ? "null" : typeof source;
  if (typeA !== typeB) {
    error("have different types (" + typeA + " !== " + typeB + ")");
  } else if (typeA === "object") {
    var keysTarget = Object.keys(target);
    for(var i in keysTarget) {
      var key = keysTarget[i];
      path.push(key);
      assertImplementsAST(target[key], source[key], path);
      path.pop();
    }
  } else if (target !== source) {
    error("are different (" + JSON.stringify(target) + " !== " + JSON.stringify(source) + ")");
  }
}

function parseAndAssertSame(code) {
  var esAST = espree.parse(code, {
    ecmaFeatures: {
      modules: true,
      classes: true,
      jsx: true
    },
    tokens: true,
    loc: true,
    range: true,
    comment: true,
    attachComment: true
  });
  var acornAST = babelEslint.parse(code);
  try {
    assertImplementsAST(esAST, acornAST);
  } catch(err) {
    err.message +=
      "\nespree:\n" +
      util.inspect(esAST, {depth: err.depth}) +
      "\nbabel-eslint:\n" +
      util.inspect(acornAST, {depth: err.depth});
    throw err;
  }
}

describe("acorn-to-esprima", function () {
  it("simple expression", function () {
    parseAndAssertSame("a = 1");
  });

  it("class declaration", function () {
    parseAndAssertSame("class Foo {}");
  });

  it("class expression", function () {
    parseAndAssertSame("var a = class Foo {}");
  });

  it("jsx expression", function () {
    parseAndAssertSame("<App />");
  });

  it("jsx expression with 'this' as identifier", function () {
    parseAndAssertSame("<this />");
  });

  it("jsx expression with a dynamic attribute", function () {
    parseAndAssertSame("<App foo={bar} />");
  });

  it("jsx expression with a member expression as identifier", function () {
    parseAndAssertSame("<foo.bar />");
  });

  it("default import", function () {
    parseAndAssertSame('import foo from "foo";');
  });

  it("import specifier", function () {
    parseAndAssertSame('import { foo } from "foo";');
  });

  it("import specifier with name", function () {
    parseAndAssertSame('import { foo as bar } from "foo";');
  });

  it("import bare", function () {
    parseAndAssertSame('import "foo";');
  });

  it("export default class declaration", function () {
    parseAndAssertSame("export default class Foo {}");
  });

  it("export default class expression", function () {
    parseAndAssertSame("export default class {}");
  });

  it("export default function declaration", function () {
    parseAndAssertSame("export default function Foo() {}");
  });

  it("export default function expression", function () {
    parseAndAssertSame("export default function () {}");
  });

  it("export all", function () {
    parseAndAssertSame('export * from "foo";');
  });

  it("export named", function () {
    parseAndAssertSame("export { foo };");
  });

  it("export named alias", function () {
    parseAndAssertSame("export { foo as bar };");
  });

  it("empty program with line comment", function () {
    parseAndAssertSame("// single comment");
  });

  it("empty program with block comment", function () {
    parseAndAssertSame("  /* multiline\n * comment\n*/");
  });

  it("line comments", function () {
    parseAndAssertSame([
      "  // single comment",
      "var foo = 15; // comment next to statement",
      "// second comment after statement"
    ].join("\n"));
  });

  it("block comments", function () {
    parseAndAssertSame([
      "  /* single comment */ ",
      "var foo = 15; /* comment next to statement */",
      "/*",
      " * multiline",
      " * comment",
      " */"
    ].join("\n"));
  });
});
