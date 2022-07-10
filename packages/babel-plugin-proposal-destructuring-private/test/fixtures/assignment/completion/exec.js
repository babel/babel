let r1, r2, r3;
class C {
  static #x = { b: 2 };
  static {
    let a, b;
    r1 = ({ a = 1, #x: { b }} = C);
    (function f(r = ({ #x: { b }} = C)) { r2 = r })();
    ((g = (r = ({ #x: { a } } = { #x: { b }} = C)) => { r3 = r }) => g())();
  }
}
expect(r1).toBe(C);
expect(r2).toBe(C);
expect(r3).toBe(C);
