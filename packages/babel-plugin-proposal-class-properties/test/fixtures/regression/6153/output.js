var _this = this;

(function () {
  let Foo =
  /*#__PURE__*/
  function () {
    class Foo {
      constructor() {
        var _this2 = this;

        Object.defineProperty(this, "fn", {
          configurable: true,
          enumerable: true,
          writable: true,
          value: function () {
            return console.log(_this2);
          }
        });
      }

    }

    Object.defineProperty(Foo, "fn", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        return console.log(_this);
      }
    });
    return Foo;
  }();
});

(function () {
  return (
    /*#__PURE__*/
    function () {
      class Bar {
        constructor() {
          var _this3 = this;

          Object.defineProperty(this, "fn", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function () {
              return console.log(_this3);
            }
          });
        }

      }

      Object.defineProperty(Bar, "fn", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function () {
          return console.log(_this);
        }
      });
      return Bar;
    }()
  );
});

(function () {
  let Baz = function () {
    class Baz {
      constructor(force) {
        _initialiseProps.call(this);
      }

    }

    Object.defineProperty(Baz, "fn", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        return console.log(_this);
      }
    });

    var _initialiseProps = function () {
      var _this4 = this;

      Object.defineProperty(this, "fn", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function () {
          return console.log(_this4);
        }
      });
      Object.defineProperty(this, "force", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: force
      });
    };

    return Baz;
  }();
});

var qux = function () {
  var _this5 = this;

  let Qux =
  /*#__PURE__*/
  function () {
    class Qux {
      constructor() {
        var _this6 = this;

        Object.defineProperty(this, "fn", {
          configurable: true,
          enumerable: true,
          writable: true,
          value: function () {
            return console.log(_this6);
          }
        });
      }

    }

    Object.defineProperty(Qux, "fn", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        return console.log(_this5);
      }
    });
    return Qux;
  }();
}.bind(this);
