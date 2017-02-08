var assert = require("assert");
var fs = require("fs");

suite("babel-register", function () {
  beforeEach(function () {
    delete require.cache[require.resolve('../lib/node')];
  })

  test("fires instrumentation hook", function (done) {
    // override the default handler for '.foobar'
    // we use '.foobar' because a handler for '.js'
    // is registered elsewhere in tests.
    var foobarExtensionHandler = function (m, filename) {
      var content = fs.readFileSync(filename, 'utf8');
      m._compile(content, filename);
    };
    require.extensions['.foobar'] = foobarExtensionHandler;

    // now add an instrumentation hook to our foobar handler,
    // and make sure it gets executed.
    foobarExtensionHandler.instrument = function (filename, code) {
      assert.ok(~filename.indexOf('foo.foobar'));
      assert.ok(~code.indexOf('module.exports'));
      done();
      return code;
    };

    // import babel-register overriding foobarExtensionHandler.
    require("../lib/node")({
      extensions: ['.foobar']
    });
    require(__dirname + "/fixtures/foo.foobar");
  });
});
