class Obj extends null {}

assert.strictEqual(Obj.toString, Function.toString);
assert.strictEqual(new Obj().toString, undefined);
