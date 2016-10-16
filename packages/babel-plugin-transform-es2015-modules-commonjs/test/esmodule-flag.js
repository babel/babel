let assert = require("assert");
let babel = require("babel-core");
let vm = require("vm");

test("Re-export doesn't overwrite __esModule flag", function () {
  let code = "export * from \"./dep\";";
  let depStub = {
    __esModule: false,
  };

  let context = {
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
