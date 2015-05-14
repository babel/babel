var operations = [];

var lib = {};

for (let key of ['f', 'g', 'h']) {
  let func = () => operations.push(`lib.${key}()`);
  Object.defineProperty(lib, key, {
    get() {
      operations.push(`get lib.${key}`);
      return func;
    }
  });
}

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
