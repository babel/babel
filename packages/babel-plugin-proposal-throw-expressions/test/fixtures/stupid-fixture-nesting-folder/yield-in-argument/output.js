function* test() {
  (function (e) {
    throw e;
  })(new Error((yield 'test')));
}
