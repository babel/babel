var _2, _3, _sum;

var result = (_2 = [5, 10], (_3 = _2.map(x => x * 2), (_sum = _3.reduce((a, b) => a + b), _sum + 1)));
assert.equal(result, 31);

var inc = x => x + 1;

var double = x => x * 2;

var result2 = [4, 9].map(x => double(inc(x)));
assert.deepEqual(result2, [10, 20]);
