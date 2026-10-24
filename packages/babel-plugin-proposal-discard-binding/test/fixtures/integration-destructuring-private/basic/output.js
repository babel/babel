let y;
class C {
  static #p;
  static #x;
  static {
    var _ref7;
    function f0(x, _ref, _ref2) {
      let {} = _ref;
      let [z,,] = _ref2;
    }
    try {} catch (_ref3) {
      let [, _ref4] = _ref3,
        {
          ...rest
        } = _ref4;
    }
    for (const _ref5 of []) {
      const {
        y
      } = _ref5;
      ;
    }
    for (let {
      valueOf: _,
      ...rest
    } in {});
    for (var _ref6 of []) {
      ({
        y
      } = _ref6);
      ;
    }
    for ({
      valueOf: _2,
      ...rest
    } in {}) {
      var _2;
      ;
    }
    [, _ref7] = [0, {
      p: 1,
      q: 2,
      r: 3
    }];
    ({
      ...rest
    } = _ref7);
    var [, _ref8] = [0, {
        p: 1,
        q: 2,
        r: 3
      }],
      {
        ...rest
      } = _ref8;
  }
}
