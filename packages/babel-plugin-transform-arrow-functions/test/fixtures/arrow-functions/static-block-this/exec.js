var name = "global";
var result;

class A {
  static {
    const getName = () => this.name;
    const nested = () => () => this.name;
    result = [getName(), nested()()];
  }
}

expect(result).toEqual(["A", "A"]);
