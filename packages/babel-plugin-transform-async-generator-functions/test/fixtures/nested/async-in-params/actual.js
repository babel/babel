async function* g(x = async function() { await 1 }) {
  await 2;
  yield 3;
}
