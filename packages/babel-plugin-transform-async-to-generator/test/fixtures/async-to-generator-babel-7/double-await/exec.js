const log = [];

const p1 = (async function () {
  log.push(1);
  await await null;
  log.push(2);
})();

const p2 = (async function () {
  log.push(3);
  await null;
  log.push(4);
})();

log.push(5);
const p3 = Promise.resolve().then(() => log.push(6)).then(() => log.push(7));

return Promise.all([p1, p2, p3]).then(() => {
  expect(log).toEqual([1, 3, 5, 4, 6, 2, 7]);
});
