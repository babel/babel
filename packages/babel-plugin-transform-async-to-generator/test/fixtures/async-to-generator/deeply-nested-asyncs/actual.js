async function s(x) {
  let t = async (y) => {
    let r = async (z) =>  {
      await z;
      return this.x;
    }
    await r;

    return this.g(r);
  }
  await t;
  return this.h(t);
}
