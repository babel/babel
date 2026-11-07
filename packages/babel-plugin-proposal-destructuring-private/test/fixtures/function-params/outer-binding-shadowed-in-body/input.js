const z = 1;
class C {
  static #x = 2;
  static m({ #x: x, y = z }) {
    var z = 3;
  }
}
