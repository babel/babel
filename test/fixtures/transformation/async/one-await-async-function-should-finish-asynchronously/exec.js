var flag1 = false;
var flag2 = false;

async function oneAwait(value) {
  flag1 = true;
  var result = await value;
  flag2 = true;
  return result;
}

var promise = oneAwait("asdf");
assert.strictEqual(flag1, true);
assert.strictEqual(flag2, false);

promise.then(function(value) {
  assert.strictEqual(flag2, true);
  assert.strictEqual(value, "asdf");
  done();
}).catch(done);
