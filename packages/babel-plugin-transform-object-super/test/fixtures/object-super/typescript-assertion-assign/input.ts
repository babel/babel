const obj = {
  __proto__: {},
  assign() {
    (super.x as any) = 1;
  },
  update() {
    (super.x as any)++;
  },
  remove() {
    delete (super.x as any);
  },
};
