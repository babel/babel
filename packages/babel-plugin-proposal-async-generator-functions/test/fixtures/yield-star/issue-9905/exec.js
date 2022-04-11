const log = [];

async function* func1() {
  log.push(1);
  yield "a";
  log.push(2);
}

async function* func2() {
  yield* func1();
  log.push(3);
}

return (async () => {
  const iterator = func2();
  await iterator.next();
  await iterator.return();

  expect(log).toEqual([1]);
})();