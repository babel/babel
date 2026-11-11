// The empty function bodies return the bindings so they can be checked.
function a({ ...a34 }) { return a34; }
function a2({a1, ...b1}) { return [a1, b1]; }
function a3({a2, b2, ...c2}) { return [a2, b2, c2]; }
function a4({a3, ...c3}, {a5, ...c5}) { return [a3, c3, a5, c5]; }
function a5({a3, b2: { ba1, ...ba2 }, ...c3}) { return [a3, ba1, ba2, c3]; }
function a6({a3, b2: { ba1, ...ba2 } }) { return [a3, ba1, ba2]; }
function a7({a1 = 1, ...b1} = {}) { return [a1, b1]; }
function a8([{...a1}]) { return a1; }
function a9([{a1, ...a2}]) { return [a1, a2]; }
function a10([a1, {...a2}]) { return [a1, a2]; }
function a11([...{ 0: a1, ...a2 }]) { return [a1, a2]; }
var a11b = function ([...{ 0: a1, ...a2 }]) { return [a1, a2]; };
var a11c = (a1 = 0, [...{ 0: a2, ...a3 }] = [9, 8]) => [a1, a2, a3];
var a12 = { a12([...{ 0: a1, ...a2 }]) { return [a1, a2]; } }.a12;
class A13 { a13([...{ 0: a1, ...a2 }]) { return [a1, a2]; } }
var a13 = A13.prototype.a13;
function a14(...[{ ...a1 }]) { return a1; }
// Unchanged
function b(a) { return a; }
function b2(a, ...b) { return [a, b]; }
function b3({ b }) { return b; }

var obj = { x: 1, y: 2 };
expect(a(obj)).toEqual({ x: 1, y: 2 });
expect(a(obj)).not.toBe(obj);
expect(a2({ a1: 1, x: 2 })).toEqual([1, { x: 2 }]);
expect(a3({ a2: 1, b2: 2, c: 3 })).toEqual([1, 2, { c: 3 }]);
expect(a4({ a3: 1, x: 2 }, { a5: 3, y: 4 })).toEqual([1, { x: 2 }, 3, { y: 4 }]);
expect(a5({ a3: 1, b2: { ba1: 2, z: 3 }, w: 4 })).toEqual([1, 2, { z: 3 }, { w: 4 }]);
expect(a6({ a3: 1, b2: { ba1: 2, z: 3 }, w: 4 })).toEqual([1, 2, { z: 3 }]);
expect(a7()).toEqual([1, {}]);
expect(a7({ a1: 2, q: 3 })).toEqual([2, { q: 3 }]);
expect(a7({ a1: undefined, q: 3 })).toEqual([1, { q: 3 }]);
expect(a8([{ x: 1 }])).toEqual({ x: 1 });
expect(a9([{ a1: 1, x: 2 }])).toEqual([1, { x: 2 }]);
expect(a10([1, { x: 2 }])).toEqual([1, { x: 2 }]);
expect(a11([9, 8])).toEqual([9, { 1: 8 }]);
expect(a11b([9, 8])).toEqual([9, { 1: 8 }]);
expect(a11c()).toEqual([0, 9, { 1: 8 }]);
expect(a11c(1, [7])).toEqual([1, 7, {}]);
expect(a12([9, 8])).toEqual([9, { 1: 8 }]);
expect(a13([9, 8])).toEqual([9, { 1: 8 }]);
expect(Object.keys(a14({ mon: 1, tue: 2 })).join()).toBe("mon,tue");
expect(b(1)).toBe(1);
expect(b2(1, 2, 3)).toEqual([1, [2, 3]]);
expect(b3({ b: 1 })).toBe(1);

expect(
  [a, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a11b, a11c, a12, a13, a14].map(
    fn => fn.length
  )
).toEqual([1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0]);
expect([b, b2, b3].map(fn => fn.length)).toEqual([1, 1, 1]);

expect(() => a(null)).toThrow(TypeError);
expect(() => a4({}, undefined)).toThrow(TypeError);
expect(() => a5({ b2: null })).toThrow(TypeError);
expect(() => a7(null)).toThrow(TypeError);
expect(() => a8([])).toThrow(TypeError);
expect(() => a11(null)).toThrow(TypeError);
expect(() => a14()).toThrow(TypeError);
