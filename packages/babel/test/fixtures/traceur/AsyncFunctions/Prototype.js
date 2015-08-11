// Options: --async-functions

async function f() {
}

assert.equal(Object.getPrototypeOf(f), Function.prototype);
assert.instanceOf(f(), Promise);
