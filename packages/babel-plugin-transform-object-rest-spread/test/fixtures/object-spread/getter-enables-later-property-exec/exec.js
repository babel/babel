const source = {
  get first() {
    Object.defineProperty(source, "later", { enumerable: true });
    return 1;
  },
};
Object.defineProperty(source, "later", { value: 2, configurable: true });
const copy = { ...source };
expect(copy).toEqual({ first: 1, later: 2 });
