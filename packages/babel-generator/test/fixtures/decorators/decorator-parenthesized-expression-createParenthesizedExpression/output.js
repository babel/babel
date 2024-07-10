class C extends class {} {
  #x;
  constructor() {
    class ShouldPreserveParens {
      @(decs[0])
      @(decs`1`)
      @(this?.two)
      @(self.#x)
      @(this.dec)
      @(super.dec)
      @(new DecFactory())
      p;
    }
    class ShouldNotAddParens {
      @decs
      @decs.one
      @decs.two()
      p;
    }
    class ShouldAddParens {
      // NOTE: This is not actually valid syntax in newer versions of the proposal
      @((decs[three])())
      p;
    }
    class WillPreserveParens {
      @(decs)
      @(decs.one)
      @(decs.two())
      p;
    }
  }
}