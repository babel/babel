function f() {
  g(function () {
    return new Promise(function ($return, $error) {
      var _this = this;

      c(function () {
        return _this;
      });
      return $return();
    }.bind(this));
  });
}

(function () {
  return new Promise(function ($return, $error) {
    var _this2 = this;

    console.log('async wrapper:', this === 'foo');

    (function () {
      console.log('nested arrow:', _this2 === 'foo');
    })();

    return $return();
  }.bind(this));
}).call('foo');
