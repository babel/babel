function* f(a = 1) {
  var a = yield a;
  return a;
}

async function g(a = 1) {
  var a = await a;
  return a;
}

async function* h(a = 1) {
  var a = await (yield a);
  return a;
}
