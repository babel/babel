function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _deep$very$o, _deep$very$o2, _deep$very$o3, _classPrivateFieldLoo, _classPrivateFieldLoo2, _ref, _ref2, _self2, _classPrivateFieldLoo3, _classPrivateFieldLoo4, _ref3, _ref4, _getSelf, _ref5, _ref6, _classPrivateFieldLoo5, _call, _getSelf2, _getSelf3, _fnDeep$very$o, _fnDeep$very$o2, _fnDeep$very$o3, _classPrivateFieldLoo6, _classPrivateFieldLoo7, _ref7, _ref8, _self3, _classPrivateFieldLoo8, _classPrivateFieldLoo9, _ref9, _ref10, _getSelf4, _ref11, _ref12, _classPrivateFieldLoo10, _call2, _getSelf5, _getSelf6, _classPrivateFieldLoo11, _classPrivateFieldLoo12, _classPrivateFieldLoo13, _classPrivateFieldLoo14, _classPrivateFieldLoo15, _classPrivateFieldLoo16, _classPrivateFieldLoo17, _classPrivateFieldLoo18, _classPrivateFieldLoo19, _classPrivateFieldLoo20, _classPrivateFieldLoo21, _classPrivateFieldLoo22, _classPrivateFieldLoo23, _classPrivateFieldLoo24, _classPrivateFieldLoo25, _classPrivateFieldLoo26, _classPrivateFieldLoo27, _classPrivateFieldLoo28, _ref13, _ref14, _classPrivateFieldLoo29, _classPrivateFieldLoo30, _classPrivateFieldLoo31, _classPrivateFieldLoo32, _ref15, _classPrivateFieldLoo33, _classPrivateFieldLoo34, _ref16, _classPrivateFieldLoo35, _classPrivateFieldLoo36, _classPrivateFieldLoo37, _classPrivateFieldLoo38, _ref17, _classPrivateFieldLoo39, _classPrivateFieldLoo40, _classPrivateFieldLoo41, _classPrivateFieldLoo42, _ref18, _classPrivateFieldLoo43, _classPrivateFieldLoo44, _ref19, _classPrivateFieldLoo45, _classPrivateFieldLoo46, _ref20, _classPrivateFieldLoo47, _classPrivateFieldLoo48, _classPrivateFieldLoo49, _classPrivateFieldLoo50, _classPrivateFieldLoo51, _classPrivateFieldLoo52, _classPrivateFieldLoo53, _classPrivateFieldLoo54, _classPrivateFieldLoo55, _classPrivateFieldLoo56, _classPrivateFieldLoo57, _classPrivateFieldLoo58, _classPrivateFieldLoo59, _classPrivateFieldLoo60, _ref21, _ref22, _classPrivateFieldLoo61, _classPrivateFieldLoo62, _classPrivateFieldLoo63, _classPrivateFieldLoo64, _ref23, _classPrivateFieldLoo65, _classPrivateFieldLoo66, _ref24, _classPrivateFieldLoo67, _classPrivateFieldLoo68, _classPrivateFieldLoo69, _classPrivateFieldLoo70, _ref25, _classPrivateFieldLoo71, _classPrivateFieldLoo72, _classPrivateFieldLoo73, _classPrivateFieldLoo74, _ref26, _classPrivateFieldLoo75, _classPrivateFieldLoo76, _ref27, _classPrivateFieldLoo77, _classPrivateFieldLoo78, _ref28, _classPrivateFieldLoo79, _classPrivateFieldLoo80;

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

    (_classPrivateFieldLoo11 = (_classPrivateFieldLoo12 = _classPrivateFieldLooseBase(Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo11.call(_classPrivateFieldLoo12);
    (_classPrivateFieldLoo13 = (_classPrivateFieldLoo14 = _classPrivateFieldLooseBase(Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo13.call(_classPrivateFieldLoo14).toString;
    (_classPrivateFieldLoo15 = (_classPrivateFieldLoo16 = _classPrivateFieldLooseBase(Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo15.call(_classPrivateFieldLoo16).toString();
    o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo17 = (_classPrivateFieldLoo18 = _classPrivateFieldLooseBase(o.Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo17.call(_classPrivateFieldLoo18);
    o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo19 = (_classPrivateFieldLoo20 = _classPrivateFieldLooseBase(o.Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo19.call(_classPrivateFieldLoo20).toString;
    o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo21 = (_classPrivateFieldLoo22 = _classPrivateFieldLooseBase(o.Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo21.call(_classPrivateFieldLoo22).toString();
    (_deep$very$o = deep == null ? void 0 : deep.very.o) === null || _deep$very$o === void 0 ? void 0 : (_classPrivateFieldLoo23 = (_classPrivateFieldLoo24 = _classPrivateFieldLooseBase(_deep$very$o.Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo23.call(_classPrivateFieldLoo24);
    (_deep$very$o2 = deep == null ? void 0 : deep.very.o) === null || _deep$very$o2 === void 0 ? void 0 : (_classPrivateFieldLoo25 = (_classPrivateFieldLoo26 = _classPrivateFieldLooseBase(_deep$very$o2.Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo25.call(_classPrivateFieldLoo26).toString;
    (_deep$very$o3 = deep == null ? void 0 : deep.very.o) === null || _deep$very$o3 === void 0 ? void 0 : (_classPrivateFieldLoo27 = (_classPrivateFieldLoo28 = _classPrivateFieldLooseBase(_deep$very$o3.Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo27.call(_classPrivateFieldLoo28).toString();
    (_ref13 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLoo = _classPrivateFieldLooseBase(o.Foo, _self)[_self], _m)[_m]) == null ? void 0 : _ref13.call(_classPrivateFieldLoo);
    (_ref14 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLoo2 = _classPrivateFieldLooseBase(o.Foo, _self)[_self].self, _m)[_m]) == null ? void 0 : _ref14.call(_classPrivateFieldLoo2);
    (_ref = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) === null || _ref === void 0 ? void 0 : (_classPrivateFieldLoo29 = (_classPrivateFieldLoo30 = _classPrivateFieldLooseBase(_ref.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo29.call(_classPrivateFieldLoo30);
    (_ref2 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].self) === null || _ref2 === void 0 ? void 0 : (_classPrivateFieldLoo31 = (_classPrivateFieldLoo32 = _classPrivateFieldLooseBase(_ref2.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo31.call(_classPrivateFieldLoo32);
    (_self2 = (_ref15 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : _ref15.self) === null || _self2 === void 0 ? void 0 : (_classPrivateFieldLoo33 = (_classPrivateFieldLoo34 = _classPrivateFieldLooseBase(_self2.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo33.call(_classPrivateFieldLoo34);
    (_ref16 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLoo3 = _classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf(), _m)[_m]) == null ? void 0 : _ref16.call(_classPrivateFieldLoo3);
    (_ref3 = o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo4 = _classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf) === null || _ref3 === void 0 ? void 0 : (_classPrivateFieldLoo35 = (_classPrivateFieldLoo36 = _classPrivateFieldLooseBase(_ref3.call(_classPrivateFieldLoo4), _m))[_m]) == null ? void 0 : _classPrivateFieldLoo35.call(_classPrivateFieldLoo36);
    (_ref4 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) === null || _ref4 === void 0 ? void 0 : (_classPrivateFieldLoo37 = (_classPrivateFieldLoo38 = _classPrivateFieldLooseBase(_ref4.getSelf(), _m))[_m]) == null ? void 0 : _classPrivateFieldLoo37.call(_classPrivateFieldLoo38);
    (_getSelf = (_ref17 = _ref5 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : _ref17.getSelf) === null || _getSelf === void 0 ? void 0 : (_classPrivateFieldLoo39 = (_classPrivateFieldLoo40 = _classPrivateFieldLooseBase(_getSelf.call(_ref5), _m))[_m]) == null ? void 0 : _classPrivateFieldLoo39.call(_classPrivateFieldLoo40);
    (_ref6 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf()) === null || _ref6 === void 0 ? void 0 : (_classPrivateFieldLoo41 = (_classPrivateFieldLoo42 = _classPrivateFieldLooseBase(_ref6.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo41.call(_classPrivateFieldLoo42);
    (_call = (_ref18 = o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo5 = _classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf) == null ? void 0 : _ref18.call(_classPrivateFieldLoo5)) === null || _call === void 0 ? void 0 : (_classPrivateFieldLoo43 = (_classPrivateFieldLoo44 = _classPrivateFieldLooseBase(_call.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo43.call(_classPrivateFieldLoo44);
    (_getSelf2 = (_ref19 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : _ref19.getSelf()) === null || _getSelf2 === void 0 ? void 0 : (_classPrivateFieldLoo45 = (_classPrivateFieldLoo46 = _classPrivateFieldLooseBase(_getSelf2.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo45.call(_classPrivateFieldLoo46);
    (_getSelf3 = (_ref20 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : _ref20.getSelf == null ? void 0 : _ref20.getSelf()) === null || _getSelf3 === void 0 ? void 0 : (_classPrivateFieldLoo47 = (_classPrivateFieldLoo48 = _classPrivateFieldLooseBase(_getSelf3.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo47.call(_classPrivateFieldLoo48);
    fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo49 = (_classPrivateFieldLoo50 = _classPrivateFieldLooseBase(fn().Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo49.call(_classPrivateFieldLoo50);
    fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo51 = (_classPrivateFieldLoo52 = _classPrivateFieldLooseBase(fn().Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo51.call(_classPrivateFieldLoo52).toString;
    fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo53 = (_classPrivateFieldLoo54 = _classPrivateFieldLooseBase(fn().Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo53.call(_classPrivateFieldLoo54).toString();
    (_fnDeep$very$o = fnDeep == null ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : (_classPrivateFieldLoo55 = (_classPrivateFieldLoo56 = _classPrivateFieldLooseBase(_fnDeep$very$o.Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo55.call(_classPrivateFieldLoo56);
    (_fnDeep$very$o2 = fnDeep == null ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o2 === void 0 ? void 0 : (_classPrivateFieldLoo57 = (_classPrivateFieldLoo58 = _classPrivateFieldLooseBase(_fnDeep$very$o2.Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo57.call(_classPrivateFieldLoo58).toString;
    (_fnDeep$very$o3 = fnDeep == null ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o3 === void 0 ? void 0 : (_classPrivateFieldLoo59 = (_classPrivateFieldLoo60 = _classPrivateFieldLooseBase(_fnDeep$very$o3.Foo, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo59.call(_classPrivateFieldLoo60).toString();
    (_ref21 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLoo6 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self], _m)[_m]) == null ? void 0 : _ref21.call(_classPrivateFieldLoo6);
    (_ref22 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLoo7 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self].self, _m)[_m]) == null ? void 0 : _ref22.call(_classPrivateFieldLoo7);
    (_ref7 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) === null || _ref7 === void 0 ? void 0 : (_classPrivateFieldLoo61 = (_classPrivateFieldLoo62 = _classPrivateFieldLooseBase(_ref7.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo61.call(_classPrivateFieldLoo62);
    (_ref8 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].self) === null || _ref8 === void 0 ? void 0 : (_classPrivateFieldLoo63 = (_classPrivateFieldLoo64 = _classPrivateFieldLooseBase(_ref8.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo63.call(_classPrivateFieldLoo64);
    (_self3 = (_ref23 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : _ref23.self) === null || _self3 === void 0 ? void 0 : (_classPrivateFieldLoo65 = (_classPrivateFieldLoo66 = _classPrivateFieldLooseBase(_self3.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo65.call(_classPrivateFieldLoo66);
    (_ref24 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLoo8 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf(), _m)[_m]) == null ? void 0 : _ref24.call(_classPrivateFieldLoo8);
    (_ref9 = fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo9 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf) === null || _ref9 === void 0 ? void 0 : (_classPrivateFieldLoo67 = (_classPrivateFieldLoo68 = _classPrivateFieldLooseBase(_ref9.call(_classPrivateFieldLoo9), _m))[_m]) == null ? void 0 : _classPrivateFieldLoo67.call(_classPrivateFieldLoo68);
    (_ref10 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) === null || _ref10 === void 0 ? void 0 : (_classPrivateFieldLoo69 = (_classPrivateFieldLoo70 = _classPrivateFieldLooseBase(_ref10.getSelf(), _m))[_m]) == null ? void 0 : _classPrivateFieldLoo69.call(_classPrivateFieldLoo70);
    (_getSelf4 = (_ref25 = _ref11 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : _ref25.getSelf) === null || _getSelf4 === void 0 ? void 0 : (_classPrivateFieldLoo71 = (_classPrivateFieldLoo72 = _classPrivateFieldLooseBase(_getSelf4.call(_ref11), _m))[_m]) == null ? void 0 : _classPrivateFieldLoo71.call(_classPrivateFieldLoo72);
    (_ref12 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf()) === null || _ref12 === void 0 ? void 0 : (_classPrivateFieldLoo73 = (_classPrivateFieldLoo74 = _classPrivateFieldLooseBase(_ref12.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo73.call(_classPrivateFieldLoo74);
    (_call2 = (_ref26 = fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo10 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf) == null ? void 0 : _ref26.call(_classPrivateFieldLoo10)) === null || _call2 === void 0 ? void 0 : (_classPrivateFieldLoo75 = (_classPrivateFieldLoo76 = _classPrivateFieldLooseBase(_call2.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo75.call(_classPrivateFieldLoo76);
    (_getSelf5 = (_ref27 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : _ref27.getSelf()) === null || _getSelf5 === void 0 ? void 0 : (_classPrivateFieldLoo77 = (_classPrivateFieldLoo78 = _classPrivateFieldLooseBase(_getSelf5.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo77.call(_classPrivateFieldLoo78);
    (_getSelf6 = (_ref28 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : _ref28.getSelf == null ? void 0 : _ref28.getSelf()) === null || _getSelf6 === void 0 ? void 0 : (_classPrivateFieldLoo79 = (_classPrivateFieldLoo80 = _classPrivateFieldLooseBase(_getSelf6.self, _m))[_m]) == null ? void 0 : _classPrivateFieldLoo79.call(_classPrivateFieldLoo80);
  }

}

var _x = _classPrivateFieldLooseKey("x");

var _m = _classPrivateFieldLooseKey("m");

var _self = _classPrivateFieldLooseKey("self");

Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Object.defineProperty(Foo, _m, {
  writable: true,
  value: function () {
    return _classPrivateFieldLooseBase(this, _x)[_x];
  }
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: Foo
});
Foo.self = Foo;
Foo.test();
