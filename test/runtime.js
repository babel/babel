var runtime = require("../lib/6to5/runtime");
var assert  = require("assert");

suite("runtime", function () {
  test("default", function () {
    var code = runtime();
    assert.ok(!!code.match(/to5Runtime/));
  });

  test("custom", function () {
    var code = runtime("customNamespace");
    assert.ok(code.match(/customNamespace/));
    assert.ok(!code.match(/to5Runtime/));
  });
});
