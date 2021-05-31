let a = "outside";

class C {
  static get [
    class D {
      static get [a]() {
        let a = "inside";
        return a;
      }
    }.outside
  ]() {
    let a = "middle";
    return a;
  }
}
