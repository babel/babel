function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var _x = _classPrivateFieldLooseKey("x");

var _self = _classPrivateFieldLooseKey("self");

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o$Foo, _o$Foo2, _o$Foo3, _deep$very$o$Foo, _deep$very$o$Foo2, _deep$very$o$Foo3, _ref, _ref2, _self2, _self3, _self$self, _ref3, _classPrivateFieldLoo, _call, _getSelf, _getSelf2, _self4, _classPrivateFieldLoo2, _call$self, _getSelf$self, _getSelf$self2, _fn$Foo, _fn$Foo2, _fn$Foo3, _fnDeep$very$o$Foo, _fnDeep$very$o$Foo2, _fnDeep$very$o$Foo3, _ref4, _ref5, _self5, _self6, _self$self2, _ref6, _classPrivateFieldLoo3, _call2, _getSelf3, _getSelf4, _self7, _classPrivateFieldLoo4, _call$self2, _getSelf$self3, _getSelf$self4;

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

    Foo === null || Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(Foo, _x)[_x];
    Foo === null || Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(Foo, _x)[_x].toString;
    Foo === null || Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(Foo, _x)[_x].toString();
    (_o$Foo = o?.Foo) === null || _o$Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(_o$Foo, _x)[_x];
    (_o$Foo2 = o?.Foo) === null || _o$Foo2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o$Foo2, _x)[_x].toString;
    (_o$Foo3 = o?.Foo) === null || _o$Foo3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o$Foo3, _x)[_x].toString();
    (_deep$very$o$Foo = deep?.very.o?.Foo) === null || _deep$very$o$Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(_deep$very$o$Foo, _x)[_x];
    (_deep$very$o$Foo2 = deep?.very.o?.Foo) === null || _deep$very$o$Foo2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_deep$very$o$Foo2, _x)[_x].toString;
    (_deep$very$o$Foo3 = deep?.very.o?.Foo) === null || _deep$very$o$Foo3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_deep$very$o$Foo3, _x)[_x].toString();
    (_ref = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) === null || _ref === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref, _x)[_x];
    (_ref2 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].self) === null || _ref2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref2, _x)[_x];
    (_self2 = (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.self) === null || _self2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self2, _x)[_x];
    (_self3 = (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].self)?.self) === null || _self3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self3, _x)[_x];
    (_self$self = (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.self?.self) === null || _self$self === void 0 ? void 0 : _classPrivateFieldLooseBase(_self$self, _x)[_x];
    (_ref3 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf()) === null || _ref3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref3, _x)[_x];
    (_call = (o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo = _classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo)) === null || _call === void 0 ? void 0 : _classPrivateFieldLooseBase(_call, _x)[_x];
    (_getSelf = (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.getSelf()) === null || _getSelf === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf, _x)[_x];
    (_getSelf2 = (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.getSelf?.()) === null || _getSelf2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf2, _x)[_x];
    (_self4 = (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf())?.self) === null || _self4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self4, _x)[_x];
    (_call$self = (o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo2)?.self) === null || _call$self === void 0 ? void 0 : _classPrivateFieldLooseBase(_call$self, _x)[_x];
    (_getSelf$self = (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.getSelf()?.self) === null || _getSelf$self === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf$self, _x)[_x];
    (_getSelf$self2 = (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.getSelf?.()?.self) === null || _getSelf$self2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf$self2, _x)[_x];
    (_fn$Foo = fn?.().Foo) === null || _fn$Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn$Foo, _x)[_x];
    (_fn$Foo2 = fn?.().Foo) === null || _fn$Foo2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn$Foo2, _x)[_x].toString;
    (_fn$Foo3 = fn?.().Foo) === null || _fn$Foo3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn$Foo3, _x)[_x].toString();
    (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o$Foo, _x)[_x];
    (_fnDeep$very$o$Foo2 = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o$Foo2, _x)[_x].toString;
    (_fnDeep$very$o$Foo3 = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o$Foo3, _x)[_x].toString();
    (_ref4 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) === null || _ref4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref4, _x)[_x];
    (_ref5 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].self) === null || _ref5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref5, _x)[_x];
    (_self5 = (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.self) === null || _self5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self5, _x)[_x];
    (_self6 = (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].self)?.self) === null || _self6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self6, _x)[_x];
    (_self$self2 = (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.self?.self) === null || _self$self2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self$self2, _x)[_x];
    (_ref6 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf()) === null || _ref6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref6, _x)[_x];
    (_call2 = (fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo3 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo3)) === null || _call2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_call2, _x)[_x];
    (_getSelf3 = (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.getSelf()) === null || _getSelf3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf3, _x)[_x];
    (_getSelf4 = (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.getSelf?.()) === null || _getSelf4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf4, _x)[_x];
    (_self7 = (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf())?.self) === null || _self7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self7, _x)[_x];
    (_call$self2 = (fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo4 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo4)?.self) === null || _call$self2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_call$self2, _x)[_x];
    (_getSelf$self3 = (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.getSelf()?.self) === null || _getSelf$self3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf$self3, _x)[_x];
    (_getSelf$self4 = (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.getSelf?.()?.self) === null || _getSelf$self4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf$self4, _x)[_x];
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
