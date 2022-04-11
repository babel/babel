let iterable = function* fn() {
  yield 1;
  yield 2;
}();

let iteratorMethod = iterable[Symbol.iterator];
iterable[Symbol.iterator] = undefined;

expect(() => {
  [...iterable];
}).toThrow(/non-iterable/);

// In older envs, regenerator uses @@iterator.
// In those browser Babel must delegate to Array.from, which
// needs to be polyfilled by the user and support @@iterator.
iterable["@@iterator"] = iteratorMethod;
Array.from = (it) => {
  var i = it["@@iterator"](), arr = [], r;
  while (!(r = it.next()).done) arr.push(r.value);
  return arr;
};

let res = [...iterable];

expect(res).toEqual([1, 2]);
