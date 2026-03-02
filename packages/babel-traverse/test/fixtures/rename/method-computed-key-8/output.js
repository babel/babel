let z = "outside";
class C {
  static get [class D {
    static get [z]() {
      let a = "inside";
      return a;
    }
  }.outside]() {
    let a = "middle";
    return a;
  }
}
