var map = fn => array => array.map(fn);

const _pipe = [10, 20];
var result = map(x => x * 20)(_pipe);
expect(result).toEqual([200, 400]);
