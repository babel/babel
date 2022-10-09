let z = () => () => "outside";
class C {
  @z
  a() {
    let a = "inside";
    return a;
  }
}
;
