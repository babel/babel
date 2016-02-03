var template  = require("../lib");
var chai      = require("chai");

suite("templating", function () {
  test("import statement will cause parser to throw by default", function () {
    chai.expect(function () {
      template("import foo from 'foo'")({});
    }).to.throw();
  });

  test("import statements are allowed with sourceType: module", function () {
    chai.expect(function () {
      template("import foo from 'foo'", {sourceType: 'module'})({});
    }).not.to.throw();
  });
});
