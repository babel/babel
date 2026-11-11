const obj = {
  async *gen() {
    await 1;
    return function.sent;
  },
};

class A {
  static async *gen() {
    return function.sent;
  }
  async *#gen() {
    return function.sent;
  }
}
