class Obj extends null {}

assert.strictEqual(Obj.toString, Function.toString);
assert.throws(() => new Obj());
