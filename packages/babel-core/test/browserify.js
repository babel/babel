let browserify = require("browserify");
let assert = require("assert");
let path = require("path");
let vm = require("vm");

suite("browserify", function() {
  test("babel/register may be used without breaking browserify", function(done) {
    let bundler = browserify(path.join(__dirname, "fixtures/browserify/register.js"));

    bundler.bundle(function(err, bundle) {
      if (err) return done(err);
      assert.ok(bundle.length, "bundle output code");

      // ensure that the code runs without throwing an exception
      vm.runInNewContext("var global = this;\n" + bundle, {});
      done();
    });
  });
});
