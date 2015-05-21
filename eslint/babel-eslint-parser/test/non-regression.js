/*eslint-env mocha*/
"use strict";
var eslint = require("eslint");

function verifyAndAssertMessages(code, rules, expectedMessages) {
  var messages = eslint.linter.verify(
    code,
    {
      parser: require.resolve(".."),
      rules: rules,
      env: {
        node: true
      }
    }
  );

  if (messages.length !== expectedMessages.length) {
    throw new Error("Expected " + expectedMessages.length + " message(s), got " + messages.length + " " + JSON.stringify(messages));
  }

  messages.forEach(function (message, i) {
    var formatedMessage = message.line + ":" + message.column + " " + message.message + (message.ruleId ? " " + message.ruleId : "");
    if (formatedMessage !== expectedMessages[i]) {
      throw new Error("Message " + i + " does not match:\nExpected: " + expectedMessages[i] + "\nActual:   " + formatedMessage);
    }
  });
}

describe("verify", function () {
  it("arrow function support (issue #1)", function () {
    verifyAndAssertMessages(
      "describe('stuff', () => {});",
      {},
      []
    );
  });

  it("EOL validation (issue #2)", function () {
    verifyAndAssertMessages(
      "module.exports = \"something\";",
      { "eol-last": 1, "semi": 1 },
      [ "1:1 Newline required at end of file but not found. eol-last" ]
    );
  });

  it("Readable error messages (issue #3)", function () {
    verifyAndAssertMessages(
      "{ , res }",
      {},
      [ "1:2 Unexpected token" ]
    );
  });

  it("Modules support (issue #5)", function () {
    verifyAndAssertMessages(
      "import Foo from 'foo';\n" +
      "export default Foo;",
      {},
      []
    );
  });

  it("Rest parameters (issue #7)", function () {
    verifyAndAssertMessages(
      "function foo(...args) { return args; }",
      { "no-undef": 1 },
      []
    );
  });

  it("Exported classes should be used (issue #8)", function () {
    verifyAndAssertMessages(
      "class Foo {} module.exports = Foo;",
      { "no-unused-vars": 1 },
      []
    );
  });

  it("super keyword in class (issue #10)", function () {
    verifyAndAssertMessages(
      "class Foo { constructor() { super() } }",
      { "no-undef": 1 },
      []
    );
  });

  it("Rest parameter in destructuring assignment (issue #11)", function () {
    verifyAndAssertMessages(
      "const [a, ...rest] = ['1', '2', '3']; module.exports = rest;",
      { "no-undef": 1 },
      []
    );
  });

  it("JSX attribute names marked as variables (issue #12)", function () {
    verifyAndAssertMessages(
      "module.exports = <div className=\"foo\" />",
      { "no-undef": 1 },
      []
    );
  });

  it("Multiple destructured assignment with compound properties (issue #16)", function () {
    verifyAndAssertMessages(
      "module.exports = { ...a.a, ...a.b };",
      { "no-dupe-keys": 1 },
      []
    );
  });

  it("Arrow function with non-block bodies (issue #20)", function () {
    verifyAndAssertMessages(
      "\"use strict\"; () => 1",
      { "strict": 1 },
      []
    );
  });

  it("await keyword (issue #22)", function () {
    verifyAndAssertMessages(
      "async function foo() { await bar(); }",
      { "no-unused-expressions": 1 },
      []
    );
  });

  it("flow type", function () {
    verifyAndAssertMessages(
      "type SomeNewType = any;",
      {},
      []
    );
  });

  it("type cast expression #102", function () {
    verifyAndAssertMessages(
      "for (let a of (a: Array)) {}",
      {},
      []
    );
  });

  it("class usage", function () {
    verifyAndAssertMessages(
      "class Lol {} module.exports = Lol;",
      { "no-unused-vars": 1 },
      []
    );
  });

  it("class properties", function () {
    verifyAndAssertMessages(
      "class Lol { foo = 'bar'; }",
      { "no-undef": 1 },
      []
    );
  });

  it("template strings #31", function () {
    verifyAndAssertMessages(
      "console.log(`${a}, b`);",
      { "comma-spacing": 1 },
      []
    );
  });

  it("template with destructuring #31", function () {
    verifyAndAssertMessages([
      "module.exports = {",
        "render() {",
          "var {name} = this.props;",
          "return Math.max(null, `Name: ${name}, Name: ${name}`);",
        "}",
      "};"].join("\n"),
      { "comma-spacing": 1 },
      []
    );
  });

  describe("decorators #72", function () {
    it("class declaration", function () {
      verifyAndAssertMessages(
        [
          "import classDeclaration from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "@classDeclaration(decoratorParameter)",
          "@classDeclaration",
          "class TextareaAutosize {}"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("method definition", function () {
      verifyAndAssertMessages(
        [
          "import classMethodDeclarationA from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "class TextareaAutosize {",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "methodDeclaration(e) {",
              "e();",
            "}",
          "}"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("method definition get/set", function () {
      verifyAndAssertMessages(
        [
          "import classMethodDeclarationA from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "class TextareaAutosize {",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "get bar() { }",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "set bar() { }",
          "}"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("object property", function () {
      verifyAndAssertMessages(
        [
          "import classMethodDeclarationA from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "var obj = {",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "methodDeclaration(e) {",
              "e();",
            "}",
          "};",
          "obj;"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });

    it("object property get/set", function () {
      verifyAndAssertMessages(
        [
          "import classMethodDeclarationA from 'decorator';",
          "import decoratorParameter from 'decorator';",
          "var obj = {",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "get bar() { },",
            "@classMethodDeclarationA(decoratorParameter)",
            "@classMethodDeclarationA",
            "set bar() { }",
          "};",
          "obj;"
        ].join("\n"),
        { "no-unused-vars": 1 },
        []
      );
    });
  });
});
