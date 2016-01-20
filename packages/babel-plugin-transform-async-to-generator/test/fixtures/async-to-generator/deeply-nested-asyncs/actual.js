async function s(x) {
  let t = async (y, a) => {
    let r = async (z, b) =>  {
      await z;
      return this.x;
    }
    await r();

    return this.g(r);
  }

  await t();
  return this.h(t);
}
