let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ...z };
async function* agf() {
  await 1;
  yield 2;
}
