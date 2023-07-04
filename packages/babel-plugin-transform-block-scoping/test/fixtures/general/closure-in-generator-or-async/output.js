function* a() {
  var fn,
    _loop = function* () {
      var x = yield "iteration";
      fn = function () {
        return x;
      };
    };
  do {
    yield* _loop();
  } while (false);
  return fn;
}
async function b() {
  var fn,
    _loop2 = async function () {
      var x = await "iteration";
      fn = function () {
        return x;
      };
    };
  do {
    await _loop2();
  } while (false);
  return fn;
}
async function* c() {
  var fn,
    _loop3 = async function* () {
      var x = yield "iteration";
      fn = function () {
        return x;
      };
    };
  do {
    yield* _loop3();
  } while (false);
  return fn;
}
