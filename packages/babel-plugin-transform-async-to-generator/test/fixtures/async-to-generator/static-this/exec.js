var name = "global";

class A {
  static f = async () => this.name;
  static {
    this.g = async () => this.name;
  }
}

return Promise.all([A.f(), A.g()]).then(result => {
  expect(result).toEqual(["A", "A"]);
});
