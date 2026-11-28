function* gen(obj) {
  const { a, b: [c, d = 1], ...rest } = yield obj;
  let [e, , ...f] = obj.list, { g } = obj;
  for (let i = 0, { h } = obj; i < h; i++) yield i;
  for (var [k, l] in obj) yield k + l;
  return [a, c, d, rest, e, f, g];
}
