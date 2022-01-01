let a = "outside";

class C {
  [a](a = "inside") {
    return a;
  }
}
