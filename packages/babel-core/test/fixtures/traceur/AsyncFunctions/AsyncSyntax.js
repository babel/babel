// Options: --async-functions

var async;
async
function f() {
  return async + async;
}

async = 1;
assert.equal(async, 1);
assert.equal(f(), 2);

async = async
function g() {

}

assert.equal(async, 1);
