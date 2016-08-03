var assert      = require("assert");
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
    error("have different types (" + typeA + " !== " + typeB + ") " + "(" + target + " !== " + source + ")");
  } else if (typeA === "object") {
    var keysTarget = Object.keys(target);
    for (var i in keysTarget) {
      var key = keysTarget[i];
      path.push(key);
      assertImplementsAST(target[key], source[key], path);
      path.pop();
    }
  } else if (target !== source) {
    error("are different (" + JSON.stringify(target) + " !== " + JSON.stringify(source) + ")");
  }
}

function lookup(obj, keypath, backwardsDepth) {
  if (!keypath) { return obj; }

  return keypath.split(".").slice(0, -1 * backwardsDepth)
  .reduce(function (base, segment) { return base && base[segment], obj; });
}

function parseAndAssertSame(code) {
  var esAST = espree.parse(code, {
    ecmaFeatures: {
        // enable JSX parsing
      jsx: true,
        // enable return in global scope
      globalReturn: true,
        // enable implied strict mode (if ecmaVersion >= 5)
      impliedStrict: true,
        // allow experimental object rest/spread
      experimentalObjectRestSpread: true
    },
    tokens: true,
    loc: true,
    range: true,
    comment: true,
    attachComment: true,
    ecmaVersion: 6,
    sourceType: "module"
  });
  var babylonAST = babelEslint.parse(code);
  try {
    assertImplementsAST(esAST, babylonAST);
  } catch (err) {
    var traversal = err.message.slice(3, err.message.indexOf(":"));
    if (esAST.tokens) {
      delete esAST.tokens;
    }
    if (babylonAST.tokens) {
      delete babylonAST.tokens;
    }
    err.message +=
      "\nespree:\n" +
      util.inspect(lookup(esAST, traversal, 2), {depth: err.depth, colors: true}) +
      "\nbabel-eslint:\n" +
      util.inspect(lookup(babylonAST, traversal, 2), {depth: err.depth, colors: true});
    throw err;
  }
  // assert.equal(esAST, babylonAST);
}

describe("babylon-to-esprima", function () {
  describe("templates", function () {
    it("empty template string", function () {
      parseAndAssertSame("``");
    });

    it("template string", function () {
      parseAndAssertSame("`test`");
    });

    it("template string using $", function () {
      parseAndAssertSame("`$`");
    });

    it("template string with expression", function () {
      parseAndAssertSame("`${a}`");
    });

    it("template string with multiple expressions", function () {
      parseAndAssertSame("`${a}${b}${c}`");
    });

    it("template string with expression and strings", function () {
      parseAndAssertSame("`a${a}a`");
    });

    it("template string with binary expression", function () {
      parseAndAssertSame("`a${a + b}a`");
    });

    it("tagged template", function () {
      parseAndAssertSame("jsx`<Button>Click</Button>`");
    });

    it("tagged template with expression", function () {
      parseAndAssertSame("jsx`<Button>Hi ${name}</Button>`");
    });

    it("tagged template with new operator", function () {
      parseAndAssertSame("new raw`42`");
    });

    it("template with nested function/object", function () {
      parseAndAssertSame("`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`");
    });

    it("template with braces inside and outside of template string #96", function () {
      parseAndAssertSame("if (a) { var target = `{}a:${webpackPort}{}}}}`; } else { app.use(); }");
    });

    it("template also with braces #96", function () {
      parseAndAssertSame(
        "export default function f1() {" +
          "function f2(foo) {" +
            "const bar = 3;" +
            "return `${foo} ${bar}`;" +
          "}" +
          "return f2;" +
        "}"
      );
    });

    it("template with destructuring #31", function () {
      parseAndAssertSame([
        "module.exports = {",
        "render() {",
        "var {name} = this.props;",
        "return Math.max(null, `Name: ${name}, Name: ${name}`);",
        "}",
        "};"
      ].join("\n"));
    });
  });

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

  it("jsx expression with spread", function () {
    parseAndAssertSame("var myDivElement = <div {...this.props} />;");
  });

  it("empty jsx text", function () {
    parseAndAssertSame("<a></a>");
  });

  it("jsx text with content", function () {
    parseAndAssertSame("<a>Hello, world!</a>");
  });

  it("nested jsx", function () {
    parseAndAssertSame("<div>\n<h1>Wat</h1>\n</div>");
  });

  it("default import", function () {
    parseAndAssertSame("import foo from \"foo\";");
  });

  it("import specifier", function () {
    parseAndAssertSame("import { foo } from \"foo\";");
  });

  it("import specifier with name", function () {
    parseAndAssertSame("import { foo as bar } from \"foo\";");
  });

  it("import bare", function () {
    parseAndAssertSame("import \"foo\";");
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
    parseAndAssertSame("export * from \"foo\";");
  });

  it("export named", function () {
    parseAndAssertSame("export { foo };");
  });

  it("export named alias", function () {
    parseAndAssertSame("export { foo as bar };");
  });

  it.skip("empty program with line comment", function () {
    parseAndAssertSame("// single comment");
  });

  it.skip("empty program with block comment", function () {
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

  it("block comments #124", function () {
    parseAndAssertSame([
      "React.createClass({",
      "render() {",
      "// return (",
      "//   <div />",
      "// ); // <-- this is the line that is reported",
      "}",
      "});"
    ].join("\n"));
  });

  it("null", function () {
    parseAndAssertSame("null");
  });

  it("boolean", function () {
    parseAndAssertSame("if (true) {} else if (false) {}");
  });

  it("regexp", function () {
    parseAndAssertSame("/affix-top|affix-bottom|affix|[a-z]/");
  });

  it("regexp in a template string", function () {
    parseAndAssertSame("`${/\\d/.exec(\"1\")[0]}`");
  });

  it("first line is empty", function () {
    parseAndAssertSame("\nimport Immutable from \"immutable\";");
  });

  it("empty", function () {
    parseAndAssertSame("");
  });

  it("jsdoc", function () {
    parseAndAssertSame([
      "/**",
      "* @param {object} options",
      "* @return {number}",
      "*/",
      "const test = function({ a, b, c }) {",
      "return a + b + c;",
      "};",
      "module.exports = test;"
    ].join("\n"));
  });

  it("empty block with comment", function () {
    parseAndAssertSame([
      "function a () {",
      "try {",
      "b();",
      "} catch (e) {",
      "// asdf",
      "}",
      "}"
    ].join("\n"));
  });

  describe("babel 6 tests", function () {
    it("MethodDefinition", function () {
      parseAndAssertSame([
        "export default class A {",
        "a() {}",
        "}"
      ].join("\n"));
    });

    it("MethodDefinition 2", function () {
      parseAndAssertSame([
        "export default class Bar { get bar() { return 42; }}"
      ].join("\n"));
    });

    it("ClassMethod", function () {
      parseAndAssertSame([
        "class A {",
        "constructor() {",
        "}",
        "}"
      ].join("\n"));
    });

    it("ClassMethod multiple params", function () {
      parseAndAssertSame([
        "class A {",
        "constructor(a, b, c) {",
        "}",
        "}"
      ].join("\n"));
    });

    it("ClassMethod multiline", function () {
      parseAndAssertSame([
        "class A {",
        "  constructor (",
        "    a,",
        "    b,",
        "    c",
        "  )",
        "{",
        "",
        "  }",
        "}"
      ].join("\n"));
    });

    it("ClassMethod oneline", function () {
      parseAndAssertSame("class A { constructor(a, b, c) {} }");
    });

    it("ObjectMethod", function () {
      parseAndAssertSame([
        "var a = {",
        "b(c) {",
        "}",
        "}"
      ].join("\n"));
    });

    it("do not allow import export everywhere", function() {
      assert.throws(function () {
        parseAndAssertSame("function F() { import a from \"a\"; }");
      }, /SyntaxError: 'import' and 'export' may only appear at the top level/);
    });

    it("return outside function", function () {
      parseAndAssertSame("return;");
    });

    it("super outside method", function () {
      parseAndAssertSame("function F() { super(); }");
    });

    it("StringLiteral", function () {
      parseAndAssertSame("");
      parseAndAssertSame("");
      parseAndAssertSame("a");
    });

    it("getters and setters", function () {
      parseAndAssertSame("class A { get x ( ) { ; } }");
      parseAndAssertSame([
        "class A {",
        "get x(",
        ")",
        "{",
        ";",
        "}",
        "}"
      ].join("\n"));
      parseAndAssertSame("class A { set x (a) { ; } }");
      parseAndAssertSame([
        "class A {",
        "set x(a",
        ")",
        "{",
        ";",
        "}",
        "}"
      ].join("\n"));
      parseAndAssertSame([
        "var B = {",
        "get x () {",
        "return this.ecks;",
        "},",
        "set x (ecks) {",
        "this.ecks = ecks;",
        "}",
        "};"
      ].join("\n"));
    });

    it("RestOperator", function () {
      parseAndAssertSame("var { a, ...b } = c");
      parseAndAssertSame("var [ a, ...b ] = c");
      parseAndAssertSame("var a = function (...b) {}");
    });

    it("SpreadOperator", function () {
      parseAndAssertSame("var a = { b, ...c }");
      parseAndAssertSame("var a = [ a, ...b ]");
      parseAndAssertSame("var a = sum(...b)");
    });
  });
});
