class Obj extends null {}

assert.strictEqual(Obj.toString, Function.toString);
if (NODE_VERSION > 4) assert.throws(() => new Obj());
