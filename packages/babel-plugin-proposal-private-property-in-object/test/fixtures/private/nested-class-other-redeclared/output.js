let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, {
      writable: true,
      value: 1
    });

    _bar.set(this, {
      writable: true,
      value: 1
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      let Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);

          _bar2.set(this, {
            writable: true,
            value: 2
          });
        }

        babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            _foo.has(this);

            _bar2.has(this);
          }
        }]);
        return Nested;
      }();

      var _bar2 = new WeakMap();

      _foo.has(this);

      _bar.has(this);
    }
  }]);
  return Foo;
}();

var _foo = new WeakMap();

var _bar = new WeakMap();
