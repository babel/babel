class C {
  #a;
  static m(z) {
    const [{ #a: a }, { b }, [c], d] = z;
    let e, f;
    [{ #a: e }, { f }] = z;
  }
}
