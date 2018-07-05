function _method() {
  _method = babelHelpers.asyncToGenerator(function* method() {
    this;

    () => this;

    () => {
      this;

      () => this;

      function x() {
        var _this = this;

        this;

        () => {
          this;
        };

        function _wrapped() {
          _wrapped = babelHelpers.asyncToGenerator(function* () {
            _this;
          });
          return _wrapped.apply(this, arguments);
        }

        (function () {
          return _wrapped.apply(this, arguments);
        });
      }
    };

    function x() {
      var _this2 = this;

      this;

      () => {
        this;
      };

      function _wrapped2() {
        _wrapped2 = babelHelpers.asyncToGenerator(function* () {
          _this2;
        });
        return _wrapped2.apply(this, arguments);
      }

      (function () {
        return _wrapped2.apply(this, arguments);
      });
    }
  });
  return _method.apply(this, arguments);
}

class Class {
  method() {
    return _method.apply(this, arguments);
  }

}
