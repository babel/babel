let z = "outside";
class C {
  [z]() {
    let a = "inside";
    return a;
  }
}
