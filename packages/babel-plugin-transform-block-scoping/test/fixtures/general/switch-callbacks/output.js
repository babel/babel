function fn() {
  var _loop = function () {
    switch (true) {
      default:
        var foo = 4;
        if (true) {
          var bar = function () {
            return foo;
          };
          console.log(bar());
        }
    }
  };
  while (true) {
    _loop();
  }
}
