class Ref {
  constructor(..._ref) {
    let [ref = Ref] = [..._ref];

    this.ref = ref;
  }
}

class X {
  constructor(..._ref2) {
    let [x = foo] = [..._ref2];

    this.x = x;
  }
}