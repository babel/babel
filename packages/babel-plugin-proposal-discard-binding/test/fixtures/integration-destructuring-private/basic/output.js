let y;
class C {
  static #p;
  static #x;
  static {
    var _p4, _5;
    function f0(x, _p, _p2) {
      var _ = _p.#p,
        [z,,] = _p2;
    }
    try {} catch (_e) {
      let [, _p3] = _e,
        _2 = _p3.#p,
        {
          ...rest
        } = _p3;
    }
    for (const _ref of []) {
      const _3 = _ref.#x,
        {
          y
        } = _ref;
      ;
    }
    for (let {
      valueOf: _7,
      ...rest
    } in {});
    for (const _ref2 of []) {
      var _4;
      _4 = _ref2.#x, {
        y
      } = _ref2;
      ;
    }
    for ({
      valueOf: _8,
      ...rest
    } in {}) {
      var _8;
      ;
    }
    [, _p4] = [0, {
      p: 1,
      q: 2,
      r: 3
    }], _5 = _p4.#p, {
      ...rest
    } = _p4;
    var [, _p5] = [0, {
        p: 1,
        q: 2,
        r: 3
      }],
      _6 = _p5.#p,
      {
        ...rest
      } = _p5;
  }
}
