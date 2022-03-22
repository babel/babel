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
      @(new DecFactory)
      p;
    }

    class ShouldNotAddParens {
      @decs
      @decs.one
      @decs.two()
      p;
    }

    class ShouldAddParens {
      @(decs[three])()
      p;
    }

    class ShouldRemoveParens {
      @(decs)
      @(decs.one)
      @(decs.two())
      p;
    }
  }
}
