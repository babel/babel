var y;
const x = (async () => {
  await Promise.resolve();
  y = 21;
  return y + y;
})();
