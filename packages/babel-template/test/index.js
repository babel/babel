import generator from "../../babel-generator";
import template from "../lib";
import chai from "chai";

const comments = "// Sum two numbers\nconst add = (a, b) => a + b;";

describe("templating", function() {
  it("import statements are allowed by default", function() {
    chai
      .expect(function() {
        template("import foo from 'foo'")({});
      })
      .not.to.throw();
  });

  it("with statements are allowed with sourceType: script", function() {
    chai
      .expect(function() {
        template("with({}){}", { sourceType: "script" })({});
      })
      .not.to.throw();
  });

  it("should strip comments by default", function() {
    const code = "const add = (a, b) => a + b;";
    const output = template(comments)();
    chai.expect(generator(output).code).to.be.equal(code);
  });

  it("should preserve comments with a flag", function() {
    const output = template(comments, { preserveComments: true })();
    chai.expect(generator(output).code).to.be.equal(comments);
  });
});
