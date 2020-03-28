function f() {
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return function* (a) {
    var a = yield a;
    return a;
  }(a);
}

async function g() {
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return async function (a) {
    var a = await a;
    return a;
  }(a);
}

async function h() {
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return async function* (a) {
    var a = await (yield a);
    return a;
  }(a);
}
