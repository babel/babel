var assert = require("assert");
var babel = require("babel-core");
var vm = require("vm");

test("Re-export doesn't overwrite __esModule flag", function () {
  var code = 'export * from "./dep";';
  var depStub = {
    __esModule: false,
  };

  var context = {
    module: {
      exports: {}
    },
    require: function (id) {
      if (id === "./dep") return depStub;
      return require(id);
    },
  };
  context.exports = context.module.exports;

  code = babel.transform(code, {
    "plugins": [
      [require("../"), {loose: true}],
    ],
    "ast": false,
  }).code;

  vm.runInNewContext(code, context);

  // exports.__esModule shouldn't be overwritten.
  assert.equal(
    context.exports.__esModule,
    true,
    "Expected exports.__esModule === true"
  );
});
