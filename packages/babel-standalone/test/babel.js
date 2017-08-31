const assert = require("assert");

// Basic smoke tests for @babel/standalone
(process.env.TEST_TYPE === "cov" ? describe.skip : describe)(
  "@babel/standalone",
  () => {
    const Babel = require("../babel");

    it("handles the es2015-no-commonjs preset", () => {
      const output = Babel.transform('const getMessage = () => "Hello World"', {
        presets: ["es2015-no-commonjs"],
      }).code;
      assert.equal(
        output,
        "var getMessage = function getMessage() {\n" +
          '  return "Hello World";\n' +
          "};",
      );
    });
    it("handles the es2015-loose preset", () => {
      const output = Babel.transform("class A {}", {
        sourceType: "script",
        presets: ["es2015-loose"],
      }).code;
      assert.equal(output, "var A = function A() {};");
    });
    it("handles the typescript preset", () => {
      const output = Babel.transform("var a: string;", {
        presets: ["typescript"],
      }).code;
      assert.equal(output, "var a;");
    });
    it("handles the flow preset", () => {
      const output = Babel.transform("var a: string;", {
        presets: ["flow"],
      }).code;
      assert.equal(output, "var a;");
    });
    it("can translate simple ast", () => {
      const ast = {
        type: "Program",
        start: 0,
        end: 2,
        directives: [],
        body: [
          {
            type: "ExpressionStatement",
            start: 0,
            end: 1,
            expression: {
              type: "NumericLiteral",
              start: 0,
              end: 2,
              value: 42,
              raw: "42",
            },
          },
        ],
        sourceType: "script",
      };
      const output = Babel.transformFromAst(ast, "42", { presets: ["es2015"] })
        .code;
      assert.equal(output, "42;");
    });

    it("handles the react preset", () => {
      const output = Babel.transform(
        "const someDiv = <div>{getMessage()}</div>",
        {
          presets: ["react"],
        },
      ).code;
      assert.equal(
        output,
        'const someDiv = React.createElement("div", null, getMessage());',
      );
    });

    it("handles presets with options", () => {
      const output = Babel.transform("export let x", {
        presets: [["es2015", { modules: false }]],
      }).code;
      assert.equal(output, "export var x;");
    });

    it("handles specifying a plugin by name", () => {
      const output = Babel.transform('const getMessage = () => "Hello World"', {
        plugins: ["transform-arrow-functions"],
      }).code;
      // Transforms arrow syntax but NOT "const".
      assert.equal(
        output,
        "const getMessage = function () {\n" +
          '  return "Hello World";\n' +
          "};",
      );
    });

    it("handles plugins with options", () => {
      const output = Babel.transform("`${x}`", {
        plugins: [["transform-template-literals", { loose: true }]],
      }).code;
      assert.equal(output, '"" + x;');
    });

    it("throws on invalid preset name", () => {
      assert.throws(
        () => Babel.transform("var foo", { presets: ["lolfail"] }),
        /Invalid preset specified in Babel options: "lolfail"/,
      );
    });

    it("throws on invalid plugin name", () => {
      assert.throws(
        () => Babel.transform("var foo", { plugins: ["lolfail"] }),
        /Invalid plugin specified in Babel options: "lolfail"/,
      );
    });

    describe("custom plugins and presets", () => {
      const lolizer = () => ({
        visitor: {
          Identifier(path) {
            path.node.name = "LOL";
          },
        },
      });

      it("allows custom plugins to be registered", () => {
        Babel.registerPlugin("lolizer", lolizer);
        const output = Babel.transform(
          "function helloWorld() { alert(hello); }",
          { plugins: ["lolizer"] },
        );
        assert.equal(
          output.code,
          `function LOL() {
  LOL(LOL);
}`,
        );
      });

      it("allows custom presets to be registered", () => {
        Babel.registerPreset("lulz", { plugins: [lolizer] });
        const output = Babel.transform(
          "function helloWorld() { alert(hello); }",
          { presets: ["lulz"] },
        );
        assert.equal(
          output.code,
          `function LOL() {
  LOL(LOL);
}`,
        );
      });
    });
  },
);
