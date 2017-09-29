var map = fn => array => array.map(fn);

var result = map(x => x * 20)([10, 20]);
assert.deepEqual(result, [200, 400]);
