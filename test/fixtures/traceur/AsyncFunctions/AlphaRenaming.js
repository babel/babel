// Options: --async-functions
// Async.

function asyncComplete(self, arg) {
  return new Promise((resolve) => {
    resolve([self, arg]);
  });
}

var self = {};
var obj = {};
var value;

async function A() {
  assert.equal(this, self);
  var value = await asyncComplete(this, arguments[0]);
  assert.deepEqual([self, obj], value);
  done();
}

A.call(self, obj);
