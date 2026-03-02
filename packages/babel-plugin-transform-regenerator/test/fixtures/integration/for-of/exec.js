let iterable = function* fn() {
  yield 1;
  yield 2;
}();

let iteratorMethod = iterable[Symbol.iterator];
iterable[Symbol.iterator] = undefined;

expect(() => {
  for (let x of iterable);
}).toThrow(/non-iterable/);

// In older envs, regenerator uses @@iterator.
iterable["@@iterator"] = iteratorMethod;

let res = [];
for (let x of iterable) res.push(x);

expect(res).toEqual([1, 2]);
