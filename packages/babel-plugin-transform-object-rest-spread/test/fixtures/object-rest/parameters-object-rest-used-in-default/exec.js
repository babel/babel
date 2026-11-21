// `q` is a free variable, as in the input (each exec test has its own global).
globalThis.q = "outer q";
var b = "outer b";
function f(x) {
  return ["f", x];
}

// The arrow functions are assigned to variables so that they can be called,
// and their empty bodies return the bindings so they can be checked.
const fn1 = ({...R}, a = R) => { return [R, a]; };
const fn2 = ({X: Y,...R}, {a = {Y}}) => { return [Y, R, a]; };
const fn3 = (a = R, {...R}) => { return [a, R]; };
const fn4 = ({...R}, e, c = 2, a = R, f = q) => { let q; return [R, e, c, a, f, q]; };
const fn5 = ({...R}, a = f(R)) => { return [R, a]; };
const fn6 = ({...R}, { [R.key]: a = 42 }) => { return [R, a]; };

const fn7 = ({...R}, {a = {R: b}}) => { return [R, a]; };
const fn8 = ({...R}, {a = R => R} = {b: R => R}) => { return [R, a]; };

var arg = { x: 1 };
var [R, a] = fn1(arg);
expect(R).toEqual({ x: 1 });
expect(R).not.toBe(arg);
expect(a).toBe(R);
expect(fn1({ x: 1 }, "a")).toEqual([{ x: 1 }, "a"]);
expect(fn1.length).toBe(1);

expect(fn2({ X: "x", y: 2 }, {})).toEqual(["x", { y: 2 }, { Y: "x" }]);
expect(fn2({ X: "x" }, { a: "a" })).toEqual(["x", {}, "a"]);
expect(fn2.length).toBe(2);
expect(() => fn2({ X: "x" })).toThrow(TypeError);

expect(fn3("a", { z: 3 })).toEqual(["a", { z: 3 }]);
// `R` is in its TDZ when the default of `a` is evaluated.
expect(() => fn3(undefined, { z: 3 })).toThrow(ReferenceError);
expect(fn3.length).toBe(0);

var [R, e, c, a, f4, q4] = fn4({ k: 4 }, "e");
expect(R).toEqual({ k: 4 });
expect(e).toBe("e");
expect(c).toBe(2);
expect(a).toBe(R);
expect(f4).toBe("outer q");
expect(q4).toBeUndefined();
expect(fn4({}, "e", 3, "a", "f")).toEqual([{}, "e", 3, "a", "f", undefined]);
expect(fn4.length).toBe(2);

var [R, a] = fn5({ m: 5 });
expect(R).toEqual({ m: 5 });
expect(a).toEqual(["f", { m: 5 }]);
expect(a[1]).toBe(R);
expect(fn5({}, "a")).toEqual([{}, "a"]);
expect(fn5.length).toBe(1);

expect(fn6({ key: "p" }, { p: "P" })).toEqual([{ key: "p" }, "P"]);
expect(fn6({ key: "p" }, {})).toEqual([{ key: "p" }, 42]);
expect(fn6.length).toBe(2);

expect(fn7({ r: 7 }, {})).toEqual([{ r: 7 }, { R: "outer b" }]);
expect(fn7({}, { a: "a" })).toEqual([{}, "a"]);
expect(fn7.length).toBe(2);

var [R, a] = fn8({ r: 8 });
expect(R).toEqual({ r: 8 });
expect(typeof a).toBe("function");
expect(a.name).toBe("a");
expect(a(8)).toBe(8);
expect(fn8({}, { a: "a" })).toEqual([{}, "a"]);
expect(fn8.length).toBe(1);
