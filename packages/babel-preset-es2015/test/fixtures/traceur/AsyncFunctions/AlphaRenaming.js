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
  expect(this).toBe(self);
  var value = await asyncComplete(this, arguments[0]);
  expect([self, obj]).toEqual(value);
  done();
}

A.call(self, obj);
