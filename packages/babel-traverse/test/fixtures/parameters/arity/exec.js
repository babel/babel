if (parseInt(process.version.slice(1)) < 6) process.exit();

eval(`
function f({a}, {b}, {c = ""}) { return [a, b, c] }
function g({a}, {b} = {b: 2}) { return [a, b] }
function h({a}, {b} = {b: 2}, c) { return [a, b, c] }
function i({a}, {b}, c, ...rest) { return [a, b, c, rest] }

assert.equal(f.length, 3)
assert.equal(g.length, 1)
assert.equal(h.length, 1)
assert.equal(i.length, 3)`);
