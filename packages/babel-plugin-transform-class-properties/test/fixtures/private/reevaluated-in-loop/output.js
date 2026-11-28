const classes = [];
const instances = [];
for (const i of ["1", "2"]) {
  let _foo = /*#__PURE__*/new WeakMap(),
    _bar;
  let Foo = /*#__PURE__*/function () {
    "use strict";

    function Foo() {
      babelHelpers.classCallCheck(this, Foo);
      babelHelpers.classPrivateFieldInitSpec(this, _foo, "foo" + i);
    }
    return babelHelpers.createClass(Foo, [{
      key: "instance",
      value: function instance() {
        return babelHelpers.classPrivateFieldGet2(_foo, this);
      }
    }], [{
      key: "static",
      value: function _static() {
        return _bar._;
      }
    }, {
      key: "instance",
      value: function instance(inst) {
        return babelHelpers.classPrivateFieldGet2(_foo, inst);
      }
    }]);
  }();
  _bar = {
    _: "bar" + i
  };
  classes.push(Foo);
  instances.push(new Foo());
}
const [Foo1, Foo2] = classes;
const [f1, f2] = instances;
expect(f1.instance()).toBe("foo1");
expect(f2.instance()).toBe("foo2");
expect(Foo1.static()).toBe("bar1");
expect(Foo2.static()).toBe("bar2");
expect(Foo1.instance(f1)).toBe("foo1");
expect(() => Foo1.instance(f2)).toThrow(TypeError);
expect(() => Foo2.instance(f1)).toThrow(TypeError);
