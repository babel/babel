let a = "outside";

class C {
  [a]() {
    let a = "inside";
    return a;
  }
}
