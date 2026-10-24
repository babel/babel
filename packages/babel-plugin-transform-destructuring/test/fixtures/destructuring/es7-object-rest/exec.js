var o = { x: 1, y: 2, w: 3, v: 4 };

var z = {};
var { ...x } = z;
expect(x).toEqual({});
expect(x).not.toBe(z);
var { x, ...y } = z;
expect(x).toBeUndefined();
expect(y).toEqual({});
var { [x]: x, ...y } = z;
expect(x).toBeUndefined();
expect(y).toEqual({});
(function({ x, ...y }) { });

({ x, y, ...z } = o);
expect(x).toBe(1);
expect(y).toBe(2);
expect(z).toEqual({ w: 3, v: 4 });

var fn = function ({ x, ...y }) {
  return [x, y];
};
expect(fn({ x: 1, a: 2, b: 3 })).toEqual([1, { a: 2, b: 3 }]);
expect(fn.length).toBe(1);
expect(() => fn(null)).toThrow(TypeError);
