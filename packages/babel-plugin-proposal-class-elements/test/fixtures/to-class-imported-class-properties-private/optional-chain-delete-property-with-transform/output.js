var _x = babelHelpers.temporalUndefined,
    _self = babelHelpers.temporalUndefined;

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _deep$very$o, _babelHelpers$classCh, _babelHelpers$classCh2, _fnDeep$very$o, _babelHelpers$classCh3, _babelHelpers$classCh4, _ref, _ref2, _ref3, _ref3$self, _ref4, _ref5, _ref6, _ref6$getSelf, _ref7, _ref8, _ref8$call, _ref9, _ref9$getSelf, _ref10, _ref10$getSelf, _ref10$getSelf$call, _ref11, _ref12, _ref13, _ref13$self, _ref14, _ref15, _ref16, _ref16$getSelf, _ref17, _ref18, _ref18$call, _ref19, _ref19$getSelf, _ref20, _ref20$getSelf, _ref20$getSelf$call;

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

    Foo == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _self).unicorn;
    (_deep$very$o = deep == null ? void 0 : deep.very.o) == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(_deep$very$o.Foo, Foo, _self).unicorn;
    o == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).unicorn;
    o == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).self.unicorn;
    (_ref = o == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)) == null ? true : delete _ref.self.unicorn;
    (_ref2 = o == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).self) == null ? true : delete _ref2.self.unicorn;
    (_ref3 = o == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)) == null ? true : (_ref3$self = _ref3.self) == null ? true : delete _ref3$self.self.unicorn;
    o == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).getSelf().unicorn;
    (_ref4 = o == null ? void 0 : (_babelHelpers$classCh = babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)).getSelf) == null ? true : delete _ref4.call(_babelHelpers$classCh).unicorn;
    (_ref5 = o == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)) == null ? true : delete _ref5.getSelf().unicorn;
    (_ref6 = o == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)) == null ? true : (_ref6$getSelf = _ref6.getSelf) == null ? true : delete _ref6$getSelf.call(_ref6).unicorn;
    (_ref7 = o == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).getSelf()) == null ? true : delete _ref7.self.unicorn;
    (_ref8 = o == null ? void 0 : (_babelHelpers$classCh2 = babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)).getSelf) == null ? true : (_ref8$call = _ref8.call(_babelHelpers$classCh2)) == null ? true : delete _ref8$call.self.unicorn;
    (_ref9 = o == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)) == null ? true : (_ref9$getSelf = _ref9.getSelf()) == null ? true : delete _ref9$getSelf.self.unicorn;
    (_ref10 = o == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)) == null ? true : (_ref10$getSelf = _ref10.getSelf) == null ? true : (_ref10$getSelf$call = _ref10$getSelf.call(_ref10)) == null ? true : delete _ref10$getSelf$call.self.unicorn;
    fn == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).unicorn;
    (_fnDeep$very$o = fnDeep == null ? void 0 : fnDeep().very.o) == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(_fnDeep$very$o.Foo, Foo, _self).unicorn;
    fn == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).unicorn;
    fn == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).self.unicorn;
    (_ref11 = fn == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)) == null ? true : delete _ref11.self.unicorn;
    (_ref12 = fn == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).self) == null ? true : delete _ref12.self.unicorn;
    (_ref13 = fn == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)) == null ? true : (_ref13$self = _ref13.self) == null ? true : delete _ref13$self.self.unicorn;
    fn == null ? true : delete babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).getSelf().unicorn;
    (_ref14 = fn == null ? void 0 : (_babelHelpers$classCh3 = babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)).getSelf) == null ? true : delete _ref14.call(_babelHelpers$classCh3).unicorn;
    (_ref15 = fn == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)) == null ? true : delete _ref15.getSelf().unicorn;
    (_ref16 = fn == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)) == null ? true : (_ref16$getSelf = _ref16.getSelf) == null ? true : delete _ref16$getSelf.call(_ref16).unicorn;
    (_ref17 = fn == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).getSelf()) == null ? true : delete _ref17.self.unicorn;
    (_ref18 = fn == null ? void 0 : (_babelHelpers$classCh4 = babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)).getSelf) == null ? true : (_ref18$call = _ref18.call(_babelHelpers$classCh4)) == null ? true : delete _ref18$call.self.unicorn;
    (_ref19 = fn == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)) == null ? true : (_ref19$getSelf = _ref19.getSelf()) == null ? true : delete _ref19$getSelf.self.unicorn;
    (_ref20 = fn == null ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)) == null ? true : (_ref20$getSelf = _ref20.getSelf) == null ? true : (_ref20$getSelf$call = _ref20$getSelf.call(_ref20)) == null ? true : delete _ref20$getSelf$call.self.unicorn;
  }

}

_x = 1;
_self = Foo;
babelHelpers.defineProperty(Foo, "self", Foo);
Foo.test();
