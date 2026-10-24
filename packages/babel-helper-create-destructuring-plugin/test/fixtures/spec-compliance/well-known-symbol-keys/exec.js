Symbol.foo = { toString: () => "foo" };
const iteratorFn = function* () {};
const obj = { [Symbol.iterator]: iteratorFn, foo: 1, bar: 2 };
const { [Symbol.iterator]: iterator, [Symbol.foo]: foo, ...rest } = obj;
expect(iterator).toBe(iteratorFn);
expect(foo).toBe(1);
expect(rest).toEqual({ bar: 2 });
expect(Object.getOwnPropertySymbols(rest)).toEqual([]);
delete Symbol.foo;
