function* test() {
  (function (e) {
    throw e;
  })(new Error(function.sent));
}
