const _excluded = ["plain"];
var _x = /*#__PURE__*/new WeakMap();
var _list = /*#__PURE__*/new WeakMap();
class C {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _x, 1);
    babelHelpers.classPrivateFieldInitSpec(this, _list, [1, 2, 3]);
  }
  static m(instance, other) {
    const x = babelHelpers.classPrivateFieldGet2(_x, instance),
      _instance$list = babelHelpers.toArray(babelHelpers.classPrivateFieldGet2(_list, instance)),
      first = _instance$list[0],
      others = babelHelpers.arrayLikeToArray(_instance$list).slice(1),
      rest = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(instance), instance)), []);
    let _other$x = babelHelpers.classPrivateFieldGet2(_x, other),
      ox = _other$x === void 0 ? 0 : _other$x,
      plain = other.plain,
      restOther = babelHelpers.objectWithoutProperties(other, _excluded);
    return {
      x,
      first,
      others,
      rest,
      ox,
      plain,
      restOther
    };
  }
}
