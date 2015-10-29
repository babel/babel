var operations = [];

var lib = {};

['f', 'g', 'h'].forEach(function (key) {
  var func = function () {
    return operations.push("lib." + key + "()");
  };
  Object.defineProperty(lib, key, {
    get: function () {
      operations.push("get lib." + key);
      return func;
    }
  });
});

({prop:'value'})
::lib.f()
::lib.g()
::lib.h();

assert.deepEqual(operations, [
  'get lib.f',
  'lib.f()',
  'get lib.g',
  'lib.g()',
  'get lib.h',
  'lib.h()'
]);
