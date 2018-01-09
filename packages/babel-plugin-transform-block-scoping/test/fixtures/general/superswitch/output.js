function foo() {
  while (true) {
    switch (2) {
      case 0:
        {
          var _ret = function () {
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
            return "break";
          }();

          switch (_ret) {
            case "break":
              break;

            default:
              if (typeof _ret === "object") return _ret.v;
          }
        }
    }
  }
}
