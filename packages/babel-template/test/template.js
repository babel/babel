import generator from "../../babel-generator";
import * as t from "babel-types";
import template from "../lib";
import chai from "chai";
const expect = chai.expect;

describe("tagged templating", () => {
  it("basic support", () => {
    const tpl = template`("stringLiteral")`;
    const result = tpl();

    expect(result).to.be.ok;
    expect(t.isStringLiteral(result.expression)).to.be.true;
  });

  describe("numeric interpolation", () => {
    it("single replacement", () => {
      const tpl = template`+${0}`;
      const node = t.numericLiteral(123);
      const result = tpl(node);

      expect(result).to.be.ok;
      expect(t.isUnaryExpression(result.expression)).to.be.true;
      expect(result.expression.argument).to.equal(node);
    });

    it("duplicate replacement", () => {
      const tpl = template`${0} + ${0}`;
      const node = t.numericLiteral(123);
      const result = tpl(node);

      expect(result).to.be.ok;
      expect(t.isBinaryExpression(result.expression)).to.be.true;
      expect(result.expression.left).to.equal(node);
      expect(result.expression.right).to.equal(result.expression.left);
    });

    it("multiple replacement", () => {
      const tpl = template`${0}.${1}(${2})`;
      const object = t.identifier("foo");
      const property = t.identifier("bar");
      const argument = t.numericLiteral(123);
      const result = tpl(object, property, argument);

      expect(result).to.be.ok;
      expect(t.isCallExpression(result.expression)).to.be.true;

      const { callee, arguments: args } = result.expression;
      expect(t.isMemberExpression(callee)).to.be.true;
      expect(callee.object).to.equal(object);
      expect(callee.property).to.equal(property);

      expect(args).to.deep.equal([argument]);
    });
  });

  describe("string interpolation", () => {
    it("has expected internal representation", () => {
      const tpl = template`${"foo"}(${"b a r"})`;
      expect(generator(tpl()).code).to.equal(
        "$BABEL_TEMPLATE$$foo($BABEL_TEMPLATE$$bAR);",
      );
    });

    it("simple replacement", () => {
      const tpl = template`${"foo"}(${"b a r"})`;
      const arg = {
        foo: t.identifier("baz"),
        "b a r": t.numericLiteral(123),
      };

      const result = tpl(arg);

      expect(result).to.be.ok;
      expect(t.isCallExpression(result.expression)).to.be.true;

      const { callee, arguments: args } = result.expression;

      expect(callee).to.equal(arg.foo);
      expect(args).to.deep.equal([arg["b a r"]]);
    });

    it("does not conflict with similar identifiers", () => {
      const tpl = template`foo + ${"foo"}`;
      const arg = {
        foo: t.identifier("foo"),
      };

      const result = tpl(arg);

      expect(result).to.be.ok;
      expect(t.isBinaryExpression(result.expression)).to.be.true;

      const { left, right } = result.expression;
      expect(left).to.not.equal(right);
      expect(t.isIdentifier(left, { name: "foo" })).to.be.true;

      expect(right).to.equal(arg.foo);
    });

    it("does not conflict when t.toIdentifier conflicts", () => {
      const tpl = template`${"fOO"} + ${"f o o"}`;
      const arg = {
        fOO: t.numericLiteral(123),
        "f o o": t.numericLiteral(321),
      };

      const result = tpl(arg);

      expect(result).to.be.ok;
      expect(t.isBinaryExpression(result.expression)).to.be.true;

      const { left, right } = result.expression;
      expect(left).to.not.equal(right);

      expect(left).to.equal(arg.fOO);
      expect(right).to.equal(arg["f o o"]);
    });
  });

  describe("mixed interpolation", () => {
    it("throws when 0 is used", () => {
      expect(() => template`${0} - ${"foo"}`).to.throw(
        "Template cannot have a '0' replacement and a named replacement at the same time",
      );
    });

    it("works", () => {
      const tpl = template`${1}.${"prop"}`;
      const arg = {
        prop: t.identifier("prop"),
      };

      const result = tpl(arg, t.thisExpression());

      expect(result).to.be.ok;
      expect(t.isMemberExpression(result.expression)).to.be.true;

      const { object, property } = result.expression;

      expect(t.isThisExpression(object)).to.be.true;
      expect(property).to.equal(arg.prop);
    });
  });

  describe("Node interpolation", () => {
    it("works", () => {
      const node = t.identifier("foo");
      const tpl = template`${node}`;

      const result = tpl();

      expect(result).to.be.ok;
      expect(result.expression).to.equal(node);
    });
  });

  describe("options", () => {
    it("works", () => {
      const remove = template({ preserveComments: false })`// comment\nid;`;
      const preserve = template({ preserveComments: true })`// comment\nid;`;

      const removeResult = remove();
      const preserveResult = preserve();

      expect(removeResult);
      expect(preserveResult).to.be.ok;

      // it exists, it just resets to undefined
      expect(removeResult.leadingComments).to.be.undefined;

      expect(Array.isArray(preserveResult.leadingComments)).to.be.true;
      expect(preserveResult.leadingComments[0]).to.have.property(
        "type",
        "CommentLine",
      );
      expect(preserveResult.leadingComments[0]).to.have.property(
        "value",
        " comment",
      );
    });
  });
});
