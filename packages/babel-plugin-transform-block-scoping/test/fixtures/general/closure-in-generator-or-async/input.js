function* a() {
  do {
    let x = yield "iteration";
    var fn = () => x;
  } while (false);
  return fn;
}

async function b() {
  do {
    let x = await "iteration";
    var fn = () => x;
  } while (false);
  return fn;
}

async function* c() {
  do {
    let x = yield "iteration";
    var fn = () => x;
  } while (false);
  return fn;
}
