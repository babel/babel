function noopFactory() {
  return function noop(x) {
    return x;
  };
}
{
  let _computedKey, _pDecs, _init_p, _init_extra_p;
  class C {
    static {
      [_init_p, _init_extra_p] = babelHelpers.applyDecs2311(this, [], [[_pDecs, 0, "p", o => o.#p, (o, v) => o.#p = v]], 0, _ => #p in _).e;
    }
    constructor() {
      _init_extra_p(this);
    }
    [(_computedKey = ("a1", "a2"), _pDecs = noopFactory(0), _computedKey)]() {}
    #p = _init_p(this);
  }
  expect(new C()).toHaveProperty("a2");
}
{
  let _computedKey3, _pDecs2, _init_p2, _init_extra_p2;
  class C {
    static {
      [_init_p2, _init_extra_p2] = babelHelpers.applyDecs2311(this, [], [[_pDecs2, 0, "p", o => o.#p, (o, v) => o.#p = v]], 0, _ => #p in _).e;
    }
    constructor() {
      _init_extra_p2(this);
    }
    [(_computedKey3 = ("a1", "b1", "b2"), _pDecs2 = noopFactory(1), _computedKey3)]() {}
    #p = _init_p2(this);
  }
  expect(new C()).toHaveProperty("b2");
}
