var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _self = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("self");
class Foo {
  static getSelf() {
    return this;
  }
  static test() {
    var _deep$very$o, _babelHelpers$classPr, _babelHelpers$classPr2, _fnDeep$very$o, _babelHelpers$classPr3, _babelHelpers$classPr4, _ref, _ref2, _ref3, _ref3$self, _ref4, _ref5, _ref6, _ref7, _ref8, _ref8$call, _ref9, _ref9$getSelf, _ref10, _ref10$getSelf, _ref11, _ref12, _ref13, _ref13$self, _ref14, _ref15, _ref16, _ref17, _ref18, _ref18$call, _ref19, _ref19$getSelf, _ref20, _ref20$getSelf;
    const o = {
      Foo: Foo
    };
    const deep = {
      very: {
        o
      }
    };
    function fn() {
      return o;
    }
    function fnDeep() {
      return deep;
    }
    Foo === null || Foo === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(Foo, _self)[_self].unicorn;
    (_deep$very$o = deep == null ? void 0 : deep.very.o) === null || _deep$very$o === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(_deep$very$o.Foo, _self)[_self].unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self].unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self].self.unicorn;
    (_ref = o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? true : delete _ref.self.unicorn;
    (_ref2 = o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self].self) == null ? true : delete _ref2.self.unicorn;
    (_ref3 = o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? true : (_ref3$self = _ref3.self) == null ? true : delete _ref3$self.self.unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf().unicorn;
    (_ref4 = o === null || o === void 0 ? void 0 : (_babelHelpers$classPr = babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf) == null ? true : delete _ref4.call(_babelHelpers$classPr).unicorn;
    (_ref5 = o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? true : delete _ref5.getSelf().unicorn;
    (_ref6 = o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? true : _ref6.getSelf == null ? true : delete _ref6.getSelf().unicorn;
    (_ref7 = o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf()) == null ? true : delete _ref7.self.unicorn;
    (_ref8 = o === null || o === void 0 ? void 0 : (_babelHelpers$classPr2 = babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf) == null ? true : (_ref8$call = _ref8.call(_babelHelpers$classPr2)) == null ? true : delete _ref8$call.self.unicorn;
    (_ref9 = o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? true : (_ref9$getSelf = _ref9.getSelf()) == null ? true : delete _ref9$getSelf.self.unicorn;
    (_ref10 = o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? true : _ref10.getSelf == null ? true : (_ref10$getSelf = _ref10.getSelf()) == null ? true : delete _ref10$getSelf.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self].unicorn;
    (_fnDeep$very$o = fnDeep == null ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(_fnDeep$very$o.Foo, _self)[_self].unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self].unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self].self.unicorn;
    (_ref11 = fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? true : delete _ref11.self.unicorn;
    (_ref12 = fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self].self) == null ? true : delete _ref12.self.unicorn;
    (_ref13 = fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? true : (_ref13$self = _ref13.self) == null ? true : delete _ref13$self.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf().unicorn;
    (_ref14 = fn === null || fn === void 0 ? void 0 : (_babelHelpers$classPr3 = babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf) == null ? true : delete _ref14.call(_babelHelpers$classPr3).unicorn;
    (_ref15 = fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? true : delete _ref15.getSelf().unicorn;
    (_ref16 = fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? true : _ref16.getSelf == null ? true : delete _ref16.getSelf().unicorn;
    (_ref17 = fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf()) == null ? true : delete _ref17.self.unicorn;
    (_ref18 = fn === null || fn === void 0 ? void 0 : (_babelHelpers$classPr4 = babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf) == null ? true : (_ref18$call = _ref18.call(_babelHelpers$classPr4)) == null ? true : delete _ref18$call.self.unicorn;
    (_ref19 = fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? true : (_ref19$getSelf = _ref19.getSelf()) == null ? true : delete _ref19$getSelf.self.unicorn;
    (_ref20 = fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? true : _ref20.getSelf == null ? true : (_ref20$getSelf = _ref20.getSelf()) == null ? true : delete _ref20$getSelf.self.unicorn;
  }
}
Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: Foo
});
Foo.self = Foo;
Foo.test();
