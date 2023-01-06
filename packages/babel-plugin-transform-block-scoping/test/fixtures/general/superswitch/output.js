function foo() {
  var _loop = function () {
    switch (2) {
      case 0:
        {
          if (true) {
            return {
              v: void 0
            };
          }
          var stuff = new Map();
          var data = 0;
          stuff.forEach(function () {
            var d = data;
          });
          break;
        }
    }
  };
  while (true) {
    var _ret = _loop();
    if (typeof _ret === "object") return _ret.v;
  }
}
