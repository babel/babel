function* gen(a, o, k) {
  a ||= yield "a";
  o.x &&= yield "o.x";
  o[k()] ??= yield "o[k]";
  return [a, o];
}

function* value(a) {
  return [a &&= yield "a", (yield "o").x ??= yield "o.x"];
}

let keys = 0;
const key = () => (keys++, "y");

let sets;
const observed = (x, y) => ({
  _x: x,
  _y: y,
  get x() { return this._x; },
  set x(v) { sets.push(["x", v]); this._x = v; },
  get y() { return this._y; },
  set y(v) { sets.push(["y", v]); this._y = v; },
});

// The right-hand sides are evaluated and assigned
sets = [];
let o = observed(1, undefined);
let it = gen(0, o, key);
expect(it.next()).toEqual({ value: "a", done: false });
expect(it.next(1)).toEqual({ value: "o.x", done: false });
expect(it.next(2)).toEqual({ value: "o[k]", done: false });
expect(it.next(3)).toEqual({ value: [1, o], done: true });
expect(sets).toEqual([["x", 2], ["y", 3]]);
expect(keys).toBe(1);

// The right-hand sides are neither evaluated nor assigned
sets = [];
o = observed(0, false);
it = gen(1, o, key);
expect(it.next()).toEqual({ value: [1, o], done: true });
expect(sets).toEqual([]);
expect(keys).toBe(2);

// The value of a logical assignment
sets = [];
o = observed(1, null);
it = value(2);
expect(it.next()).toEqual({ value: "a", done: false });
expect(it.next(3)).toEqual({ value: "o", done: false });
o.x = null;
expect(it.next(o)).toEqual({ value: "o.x", done: false });
expect(it.next(4)).toEqual({ value: [3, 4], done: true });
expect(sets).toEqual([["x", null], ["x", 4]]);

sets = [];
o = observed(5, null);
it = value(0);
expect(it.next()).toEqual({ value: "o", done: false });
expect(it.next(o)).toEqual({ value: [0, 5], done: true });
expect(sets).toEqual([]);

// `??`
function* nullish(a) {
  return a ?? (yield "a");
}

function* template(o) {
  `${o}` ?? (yield "o");
}

expect(nullish(0).next()).toEqual({ value: 0, done: true });
expect(nullish(null).next()).toEqual({ value: "a", done: false });

it = nullish(undefined);
it.next();
expect(it.next(1)).toEqual({ value: 1, done: true });

let calls = 0;
const s = { toString: () => (calls++, "o") };
expect(template(s).next()).toEqual({ value: undefined, done: true });
expect(calls).toBe(1);
