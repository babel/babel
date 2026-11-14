const example = (obj) => {
  const foo = 'foo';
  const { [`prefix_${foo}`]: _, ...rest } = obj;
};

expect(example({ prefix_foo: 1, other: 2 })).toBeUndefined();

const example2 = (obj, foo) => {
  const { [`prefix_${foo}`]: _, ...rest } = obj;
  return [_, rest];
};

const obj = { prefix_foo: 1, prefix_bar: 2, other: 3 };
expect(example2(obj, "foo")).toEqual([1, { prefix_bar: 2, other: 3 }]);
expect(example2(obj, "bar")).toEqual([2, { prefix_foo: 1, other: 3 }]);
