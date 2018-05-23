function* foo(...items) {
  return items;
}

expect(foo(1, 2, 3).next().value).toEqual([1, 2, 3]);
