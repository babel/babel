let a = () => () => "outside";

class C {
  @a a() {
    let a = "inside";
    return a;
  }
};
