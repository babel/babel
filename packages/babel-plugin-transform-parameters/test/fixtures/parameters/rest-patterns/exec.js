function foo(...{ length }) {
  return length;
}

expect(foo(1, 2, 3)).toEqual(3);
