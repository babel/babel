class Class {
  method() {
    var _this = this;

    return babelHelpers.asyncToGenerator(function* () {
      _this;
      (function () {
        return _this;
      });
      (function () {
        _this;
        (function () {
          return _this;
        });
        function x() {
          var _this2 = this;

          this;
          (function () {
            _this2;
          });
          babelHelpers.asyncToGenerator(function* () {
            _this2;
          });
        }
      });
      function x() {
        var _this3 = this;

        this;
        (function () {
          _this3;
        });
        babelHelpers.asyncToGenerator(function* () {
          _this3;
        });
      }
    })();
  }
}
