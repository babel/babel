var chai        = require("chai");

// Require-hook.
require("../../lib/babel/api/register/node");

suite("require hook", function () {
  test("not node_modules", function () {
    chai.expect(function () {
      require("./fixtures/require-hook/not_node_modules/input");
    }).to.not.throw();
  });
});
