const values = [];

function* gen() {
  values.push(function.sent);
  values.push(function.sent);
  values.push(yield "foo");
  values.push(function.sent);
  values.push(yield);
  values.push(function.sent);
  values.push(function.sent);
}

const it = gen();
expect(values).toEqual([]);

expect(it.next(1).value).toBe("foo");
expect(values).toEqual([ 1, 1 ]);

expect(it.next(2).value).toBeUndefined();
expect(values).toEqual([ 1, 1, 2, 2 ]);

expect(it.next(3).done).toBe(true);
expect(values).toEqual([ 1, 1, 2, 2, 3, 3, 3 ]);
