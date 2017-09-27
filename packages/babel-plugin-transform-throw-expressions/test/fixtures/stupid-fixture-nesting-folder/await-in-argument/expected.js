async function test() {
  (function (e) {
    throw e;
  })(new Error((await 'test')));
}
