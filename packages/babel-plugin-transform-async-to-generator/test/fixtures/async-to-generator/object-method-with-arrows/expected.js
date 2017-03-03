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
          () => {
            this;
          };
          babelHelpers.asyncToGenerator(function* () {
            _this2;
          });
        }
      });
      function x() {
        var _this3 = this;

        this;
        () => {
          this;
        };
        babelHelpers.asyncToGenerator(function* () {
          _this3;
        });
      }
    })();
  }
}
