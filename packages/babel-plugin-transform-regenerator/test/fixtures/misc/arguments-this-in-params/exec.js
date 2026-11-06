function* g(a = arguments.length, b = this, o = { [arguments[0]]() {} }) {
  yield [a, b, Object.keys(o), arguments.length];
}

var ctx = {};
expect(g.call(ctx, undefined, undefined).next().value).toEqual([
  2,
  ctx,
  ["undefined"],
  2,
]);
