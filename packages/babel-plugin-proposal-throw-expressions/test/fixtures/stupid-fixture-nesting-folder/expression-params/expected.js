function test(a = function (e) {
  throw e;
}(new Error('test'))) {}
