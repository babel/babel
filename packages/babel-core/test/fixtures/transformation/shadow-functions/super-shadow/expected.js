class Child extends Parent {

  constructor() {
    var _superCall = (_x2, _x3, _x4, _x5, _x6) => super(_x2, _x3, _x4, _x5, _x6);

    var foo = function () {
      let arg = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      return _superCall(arg, 2, 3, 4, 5);
    };
    foo();
  }

  params() {
    var _superGet = prop => super[prop],
        _this = this,
        _superSet = (prop, val) => super[prop] = val;

    var fn = () => {
      super.params(a, b, c, d);

      super.params++;
      ++super.params;
      super.params--;
      --super.params;
      super.params += 4;
      super.params /= 4;
      super.params %= 4;

      super[a + b] = c;
    };
    var fn2 = function () {
      var _params, _params2;

      let arg1 = arguments.length <= 0 || arguments[0] === undefined ? 4 : arguments[0];

      _superGet("params").call(_this, a, b, c, d);

      _params = _superGet("params")

      _superSet("params", _params + 1)

      _superSet("params", _superGet("params") + 1);
      _params2 = _superGet("params")

      _superSet("params", _params2 + 1)

      _superSet("params", _superGet("params") - 1);
      _superSet("params", _superGet("params") + 4);
      _superSet("params", _superGet("params") / 4);
      _superSet("params", _superGet("params") % 4);

      _superSet(a + b, c);
    };
  }

  asyncFn() {
    var _superGet2 = prop => super[prop],
        _this2 = this,
        _superSet2 = (prop, val) => super[prop] = val;

    var fn = () => {
      super.params(a, b, c, d);

      super.params++;
      ++super.params;
      super.params--;
      --super.params;
      super.params += 4;
      super.params /= 4;
      super.params %= 4;

      super[a + b] = c;
    };
    var fn2 = (() => {
      var ref = babelHelpers.asyncToGenerator(function* () {
        var _params3, _params4;

        _superGet2("params").call(_this2, a, b, c, d);

        _params3 = _superGet2("params")

        _superSet2("params", _params3 + 1)

        _superSet2("params", _superGet2("params") + 1);
        _params4 = _superGet2("params")

        _superSet2("params", _params4 + 1)

        _superSet2("params", _superGet2("params") - 1);
        _superSet2("params", _superGet2("params") + 4);
        _superSet2("params", _superGet2("params") / 4);
        _superSet2("params", _superGet2("params") % 4);

        _superSet2(a + b, c);
      });
      return function fn2() {
        return ref.apply(this, arguments);
      };
    })();
  }

}
