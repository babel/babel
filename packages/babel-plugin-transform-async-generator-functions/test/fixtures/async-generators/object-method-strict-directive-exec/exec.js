const obj = {
  async *m() {
    "use strict";
    yield this;
  },
};

const { m } = obj;

return m()
  .next()
  .then(r => {
    expect(r.value).toBeUndefined();
    expect(r.done).toBe(false);
  });
