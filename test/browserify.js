var browserify = require("browserify");
var assert = require("assert");
var path = require("path");
var vm = require("vm");

suite("browserify", function() {
  test("babel/register may be used without breaking browserify", function(done) {
    var bundler = browserify(path.join(__dirname, "fixtures/browserify/register.js"));

    bundler.bundle(function(err, bundle) {
      if (err) return done(err);
      assert.ok(bundle.length, "bundle output code");

      // ensure that the code runs without throwing an exception
      vm.runInNewContext("var global = this;\n" + bundle, {});
      done();
    })
  })
});
