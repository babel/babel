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

return (async () => {
  let it = a();
  expect(it.next().value).toBe("iteration");
  expect(it.next("foo").value()).toBe("foo");

  expect((await b())()).toBe("iteration");

  it = c();
  expect((await it.next()).value).toBe("iteration");
  expect((await it.next("foo")).value()).toBe("foo");
})();

