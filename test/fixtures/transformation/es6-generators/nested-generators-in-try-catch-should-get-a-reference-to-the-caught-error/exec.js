function *gen() {
  try {
     nonExistent;
  } catch (e) {
    yield function* () {
      yield e;
    }
  }
}

var genFun2 = gen().next().value;
assert.ok(regeneratorRuntime.isGeneratorFunction(genFun2));
var gen2 = genFun2();
var res = gen2.next();
assert.ok(res.value instanceof ReferenceError);
// Note that we don't do strict equality over the message because it varies
// across browsers (if we ever want to run tests in browsers).
assert.ok(res.value.message.match(/nonExistent/));
