// NOTE: relative imports don't work yet in the test runner

return import('os').then(function (e) {
  assert(Object.isFrozen(e))
  assert(e.__esModule)
  assert.deepEqual(Object.keys(e), ['default'])
  assert.strictEqual(e.default, require('os'))
})
