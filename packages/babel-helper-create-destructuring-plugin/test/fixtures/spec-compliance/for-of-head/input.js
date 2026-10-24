for (const { a, b: [c = 10, ...d] = [], ...rest } of items) {
  use(a, c, d, rest);
}
for ({ x, ...y } of items) {}
for (var [k, { v }] in obj);
