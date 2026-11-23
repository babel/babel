({
  m() {
    "use strict";

    var _this = this;
    return babelHelpers.wrapAsyncGenerator(function* () {
      yield _this;
    })();
  }
});
