assert.equal(null ?? undefined, undefined);
assert.equal(undefined ?? null, null);
assert.equal(false ?? true, false);
assert.equal(0 ?? 1, 0);
assert.equal("" ?? "foo", "");

var obj = { exists: true };
assert.equal(obj.exists ?? false, true);
assert.equal(obj.doesNotExist ?? "foo", "foo");

var counter = 0;
function sideEffect() { return counter++; }
assert.equal(sideEffect() ?? -1, 0);

var counter2 = 0;
var obj2 = {
    get foo() { return counter2++; }
};
assert.equal(obj2.foo ?? -1, 0);