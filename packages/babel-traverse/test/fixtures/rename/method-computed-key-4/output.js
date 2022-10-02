let z = "outside";
class C {
  [z](a = "inside") {
    return a;
  }
}
