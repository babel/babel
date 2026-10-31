// `q` is a free global variable in the input
globalThis.q = "outer q";
function f(r) {
  return { wrapped: r };
}

var fn1 = ({...R}, a = R) => { return [R, a]; };
var fn2 = ({...R}, e, c = 2, a = R, f = q) => { let q; return [R, e, c, a, f, q]; };
var fn3 = ({...R}, a = f(R)) => { return [R, a]; };

var arg = { x: 1, y: 2 };
var R, a;

[R, a] = fn1(arg);
expect(R).toEqual({ x: 1, y: 2 });
expect(R).not.toBe(arg);
expect(a).toBe(R);

[R, a] = fn1(arg, "a value");
expect(R).toEqual({ x: 1, y: 2 });
expect(a).toBe("a value");

var result = fn2(arg, "e value");
expect(result[0]).toEqual({ x: 1, y: 2 });
expect(result[0]).not.toBe(arg);
expect(result[1]).toBe("e value");
expect(result[2]).toBe(2);
expect(result[3]).toBe(result[0]);
expect(result[4]).toBe("outer q");
expect(result[5]).toBeUndefined();

result = fn2(arg, "e value", "c value", "a value", "f value");
expect(result.slice(1)).toEqual([
  "e value",
  "c value",
  "a value",
  "f value",
  undefined,
]);

[R, a] = fn3(arg);
expect(R).toEqual({ x: 1, y: 2 });
expect(R).not.toBe(arg);
expect(a).toEqual({ wrapped: R });
expect(a.wrapped).toBe(R);

expect(() => fn1(null)).toThrow(TypeError);
expect(() => fn2()).toThrow(TypeError);
expect(() => fn3(undefined)).toThrow(TypeError);

delete globalThis.q;
