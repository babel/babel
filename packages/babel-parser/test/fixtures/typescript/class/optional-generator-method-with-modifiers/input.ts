class C {
  private *a?() { }
  public *b?() { }
  static *c?() { }
  abstract *d?() { }
  readonly *e?() { }
  declare *f?() { }
  protected *g?() { }
}

class A {
  private *[a?.a]?() { }
  public *[b?.b]?() { }
  static *[c?.c]?() { }
  abstract *[d?.d]?() { }
  readonly *[e?.e]?() { }
  declare *[f?.f]?() { }
  protected *[g?.g]?() { }
}
