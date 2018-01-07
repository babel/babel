var _ref;

var map = fn => array => array.map(fn);

var result = (_ref = [10, 20], map(x => x * 20)(_ref));
assert.deepEqual(result, [200, 400]);
