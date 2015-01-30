for (let i = 0, x = 2; i < 5; i++);

assert.ok(typeof i === "undefined");
assert.ok(typeof x === "undefined");
