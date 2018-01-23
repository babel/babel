import generator from "../../babel-generator";
import template from "../lib";
import { expect } from "chai";
import * as t from "@babel/types";

const comments = "// Sum two numbers\nconst add = (a, b) => a + b;";

describe("babel-template", function() {
  it("import statements are allowed by default", function() {
    expect(function() {
      template("import foo from 'foo'")({});
    }).not.to.throw();
  });

  it("with statements are allowed with sourceType: script", function() {
    expect(function() {
      template("with({}){}", { sourceType: "script" })({});
    }).not.to.throw();
  });

  it("should strip comments by default", function() {
    const code = "const add = (a, b) => a + b;";
    const output = template(comments)();
    expect(generator(output).code).to.be.equal(code);
  });

  it("should preserve comments with a flag", function() {
    const output = template(comments, { preserveComments: true })();
    expect(generator(output).code).to.be.equal(comments);
  });

  describe("string-based", () => {
    it("should handle replacing values from an object", () => {
      const value = t.stringLiteral("some string value");
      const result = template(`
        if (SOME_VAR === "") {}
      `)({
        SOME_VAR: value,
      });

      expect(result.type).to.equal("IfStatement");
      expect(result.test.type).to.equal("BinaryExpression");
      expect(result.test.left).to.equal(value);
    });

    it("should handle replacing values given an array", () => {
      const value = t.stringLiteral("some string value");
      const result = template(`
        if ($0 === "") {}
      `)([value]);

      expect(result.type).to.equal("IfStatement");
      expect(result.test.type).to.equal("BinaryExpression");
      expect(result.test.left).to.equal(value);
    });

    it("should handle replacing values with null to remove them", () => {
      const result = template(`
        callee(ARG);
      `)({ ARG: null });

      expect(result.type).to.equal("ExpressionStatement");
      expect(result.expression.type).to.equal("CallExpression");
      expect(result.expression.arguments).to.eql([]);
    });

    it("should handle replacing values that are string content", () => {
      const result = template(`
        ("ARG");
      `)({ ARG: "some new content" });

      expect(result.type).to.equal("ExpressionStatement");
      expect(result.expression.type).to.equal("StringLiteral");
      expect(result.expression.value).to.equal("some new content");
    });

    it("should automatically clone nodes if they are injected twice", () => {
      const id = t.identifier("someIdent");

      const result = template(`
        ID;
        ID;
      `)({ ID: id });

      expect(result[0].type).to.equal("ExpressionStatement");
      expect(result[0].expression).to.equal(id);
      expect(result[1].type).to.equal("ExpressionStatement");
      expect(result[1].expression).not.to.equal(id);
      expect(result[1].expression).to.eql(id);
    });

    it("should allow passing in a whitelist of replacement names", () => {
      const id = t.identifier("someIdent");
      const result = template(
        `
          some_id;
        `,
        { placeholderWhitelist: new Set(["some_id"]) },
      )({ some_id: id });

      expect(result.type).to.equal("ExpressionStatement");
      expect(result.expression).to.equal(id);
    });

    it("should allow passing in a RegExp to match replacement patterns", () => {
      const id = t.identifier("someIdent");
      const result = template(
        `
          ID;
          ANOTHER_ID;
        `,
        { placeholderPattern: /^ID$/ },
      )({ ID: id });

      expect(result[0].type).to.equal("ExpressionStatement");
      expect(result[0].expression).to.equal(id);
      expect(result[1].type).to.equal("ExpressionStatement");
      expect(result[1].expression.type).to.equal("Identifier");
      expect(result[1].expression.name).to.equal("ANOTHER_ID");
    });

    it("should throw if unknown replacements are provided", () => {
      expect(() => {
        template(`
          ID;
        `)({ ID: t.identifier("someIdent"), ANOTHER_ID: null });
      }).to.throw(Error, 'Unknown substitution "ANOTHER_ID" given');
    });

    it("should throw if placeholders are not given explicit values", () => {
      expect(() => {
        template(`
          ID;
          ANOTHER_ID;
        `)({ ID: t.identifier("someIdent") });
      }).to.throw(
        Error,
        `Error: No substitution given for "ANOTHER_ID". If this is not meant to be a
          placeholder you may want to consider passing one of the following options to babel-template:
          - { placeholderPattern: false, placeholderWhitelist: new Set(['ANOTHER_ID']) }
          - { placeholderPattern: /^ANOTHER_ID$/ }`,
      );
    });

    it("should return the AST directly when using .ast", () => {
      const result = template.ast(`
        if ("some string value" === "") {}
      `);

      expect(result.type).to.equal("IfStatement");
      expect(result.test.type).to.equal("BinaryExpression");
      expect(result.test.left.type).to.equal("StringLiteral");
      expect(result.test.left.value).to.equal("some string value");
    });
  });

  describe("literal-based", () => {
    it("should handle replacing values from an object", () => {
      const value = t.stringLiteral("some string value");
      const result = template`
        if (${value} === "") {}
      `();

      expect(result.type).to.equal("IfStatement");
      expect(result.test.type).to.equal("BinaryExpression");
      expect(result.test.left).to.equal(value);
    });

    it("should handle replacing values with null to remove them", () => {
      const result = template`
        callee(${null});
      `();

      expect(result.type).to.equal("ExpressionStatement");
      expect(result.expression.type).to.equal("CallExpression");
      expect(result.expression.arguments).to.eql([]);
    });

    it("should handle replacing values that are string content", () => {
      const result = template`
        ("${"some new content"}");
      `();

      expect(result.type).to.equal("ExpressionStatement");
      expect(result.expression.type).to.equal("StringLiteral");
      expect(result.expression.value).to.equal("some new content");
    });

    it("should allow setting options by passing an object", () => {
      const result = template({ sourceType: "script" })`
        with({}){}
      `();

      expect(result.type).to.equal("WithStatement");
    });

    it("should return the AST directly when using .ast", () => {
      const value = t.stringLiteral("some string value");
      const result = template.ast`
        if (${value} === "") {}
      `;

      expect(result.type).to.equal("IfStatement");
      expect(result.test.type).to.equal("BinaryExpression");
      expect(result.test.left).to.equal(value);
    });
  });
});
