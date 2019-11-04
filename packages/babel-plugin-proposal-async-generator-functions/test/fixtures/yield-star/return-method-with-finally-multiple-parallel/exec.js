const log = [];

async function* inner() {
  try {
    log.push(1);
    yield "a";
    log.push(2);
    yield "b";
    log.push(3);
  } finally {
    log.push(4);
    yield "c";
    log.push(5);
  }
}

async function* outer() {
  log.push(6);
  yield* inner();
  log.push(7);
}

return (async () => {
  const iterator = outer();

  let res = await iterator.next();
  expect(res).toEqual({ value: "a", done: false });
  expect(log).toEqual([6, 1]);

  const [res1, res2] = await Promise.all([ iterator.return("x"), iterator.return("y") ]);
  expect(res1).toEqual({ value: "c", done: false });
  expect(res2).toEqual({ value: "y", done: true });
  expect(log).toEqual([6, 1, 4]);
})();
