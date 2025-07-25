async function p(x) {
  const y = await async function () {
    let z;
    return await x;
  }();
  return y;
}
