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

  res = await iterator.return("x");
  expect(res).toEqual({ value: "c", done: false });
  expect(log).toEqual([6, 1, 4]);

  res = await iterator.return("y");
  expect(res).toEqual({ value: "y", done: true });
  expect(log).toEqual([6, 1, 4]);
})();
