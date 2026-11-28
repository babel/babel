var iteratorLog = [];
var emptyPatternIterable = {
  [Symbol.iterator]() {
    iteratorLog.push("iterator");
    return {
      next() {
        iteratorLog.push("next");
        return { done: false, value: 1 };
      },
      return() {
        iteratorLog.push("return");
        return {};
      },
    };
  },
};
// Every call to `z()` returns the next value, one per declaration.
var values = [
  { x15: ["p", "q"] },
  { x4: { m: 4 } },
  { x5: { w5: 5, n: 5 } },
  { x6: { w6: { a6: 6, o: 6 } } },
  { x7: { e7: "e7", r7: "r7" }, q7: { w7: { a7: 7, p: 7 } } },
  { x8: 8, s: 8 },
  { x9: { w9: { a9: 9, t: 9 } }, x10: { a10: 10, u: 10 } },
  { x11: [{ w11: 11, v: 11 }] },
  { x12: [{ a12: "a12", b12: "b12" }, { c12: 12, w: 12 }] },
  { x13: ["hole", { c13: 13, x: 13 }] },
  { x14: ["r", "s"] },
  { x15: ["t"] },
  { x16: emptyPatternIterable },
  ["y", "17"],
  ["a", "b"],
  ["c"],
  { x20: { k: 20 } },
  {},
  [["y23"]],
  [],
  { x25: "ab" },
  { x26: [26, 27, 28] },
  [1, 2, "x27"],
  { x28: [0, 0, { k: 28 }] },
  { x29: [0, 0, { q29: 29, k: 29 }] },
  [0, 0, { y30: 30, k: 30 }],
  [0, 0, { k: 31 }],
  { x32: {}, w32: { k: 32 } },
  [0, 0, {}, { k: "q32" }],
  { k: 33, l: 34 },
];
function z() {
  return values.shift();
}
var complex = { x: { a: "xa", kk: "f", b: 1 }, y: { c: 2 }, g: 3 };

const { x15: [...{ ...y15 }] } = z();

// `d` is in its TDZ when the computed key `[d]` is evaluated.
expect(() => {
  let {
    x: { a: xa, [d]: f, ...asdf },
    y: { ...d },
    ...g
  } = complex;
}).toThrow(ReferenceError);

let { x4: { ...y4 } } = z();

let { x5: { w5, ...y5 } } = z();
let { x6: { w6: { a6, ...y6 } } } = z();
let { x7: { e7, r7 }, q7: { w7: { a7, ...y7 } } } = z();
let { x8, ...y8 } = z();
let { x9: { w9: { a9, ...y9 } }, x10: { a10, ...y10 },  } = z();
let { x11: [{ w11, ...z11 }] } = z();
let { x12: [{ a12, b12 }, { c12, ...d12 }] } = z();
let { x13: [, { c13, ...d13 }] } = z();
const { x14: [...{ q14, ...y14 }] } = z();
const { x15: [...{ ...y16 }] } = z();
const { x16: [] } = z();
const [...[ ...y17 ]] = z();
const [...{ ...y18 }] = z();
const [...{ a19, ...y19 }] = z();
const { x20: { ...y20 } = { } } = z();
const { x22: { q22, ...y22  } = {} } = z();
const [[ ...y23 ] = []] = z();
const [{ ...y24 } = []] = z();
const { x25: [ ...y25 ] = []} = z();
const { x26: [ q26, ...y26 ] = []} = z();
const {} = {};
const [,,x27] = z();
const {x28: [,,{...y28}]} = z();
const {x29: [,,{q29, ...y29}]} = z();
const [,,{y30, ...x30}] = z();
const [,,{...x31}] = z();
const { x32: { }, w32: { ...y32 } } = z();
const [,,{}, {...q32}] = z();
const { ...y33 } = z();

expect(values).toHaveLength(0);
expect(y15).toEqual({ 0: "p", 1: "q" });
expect(y4).toEqual({ m: 4 });
expect(w5).toBe(5);
expect(y5).toEqual({ n: 5 });
expect(a6).toBe(6);
expect(y6).toEqual({ o: 6 });
expect(e7).toBe("e7");
expect(r7).toBe("r7");
expect(a7).toBe(7);
expect(y7).toEqual({ p: 7 });
expect(x8).toBe(8);
expect(y8).toEqual({ s: 8 });
expect(a9).toBe(9);
expect(y9).toEqual({ t: 9 });
expect(a10).toBe(10);
expect(y10).toEqual({ u: 10 });
expect(w11).toBe(11);
expect(z11).toEqual({ v: 11 });
expect(a12).toBe("a12");
expect(b12).toBe("b12");
expect(c12).toBe(12);
expect(d12).toEqual({ w: 12 });
expect(c13).toBe(13);
expect(d13).toEqual({ x: 13 });
expect(q14).toBeUndefined();
expect(y14).toEqual({ 0: "r", 1: "s" });
expect(y16).toEqual({ 0: "t" });
expect(iteratorLog).toEqual(["iterator", "return"]);
expect(y17).toEqual(["y", "17"]);
expect(y18).toEqual({ 0: "a", 1: "b" });
expect(a19).toBeUndefined();
expect(y19).toEqual({ 0: "c" });
expect(y20).toEqual({ k: 20 });
expect(q22).toBeUndefined();
expect(y22).toEqual({});
expect(y23).toEqual(["y23"]);
expect(y24).toEqual({});
expect(y25).toEqual(["a", "b"]);
expect(q26).toBe(26);
expect(y26).toEqual([27, 28]);
expect(x27).toBe("x27");
expect(y28).toEqual({ k: 28 });
expect(q29).toBe(29);
expect(y29).toEqual({ k: 29 });
expect(y30).toBe(30);
expect(x30).toEqual({ k: 30 });
expect(x31).toEqual({ k: 31 });
expect(y32).toEqual({ k: 32 });
expect(q32).toEqual({ k: "q32" });
expect(y33).toEqual({ k: 33, l: 34 });

// The same declaration, with a computed key that isn't in its TDZ.
{
  var key = "kk";
  let {
    x: { a: xa, [key]: f, ...asdf },
    y: { ...d },
    ...g
  } = complex;
  expect(xa).toBe("xa");
  expect(f).toBe("f");
  expect(asdf).toEqual({ b: 1 });
  expect(d).toEqual({ c: 2 });
  expect(d).not.toBe(complex.y);
  expect(g).toEqual({ g: 3 });
}
