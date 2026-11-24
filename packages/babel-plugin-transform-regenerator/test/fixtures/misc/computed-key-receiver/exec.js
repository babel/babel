function* inCatchPattern() {
  try {
    throw {};
  } catch ({ a = { [this.key]() {} } }) {
    yield Object.keys(a);
  }
}

function* inBody() {
  yield 0;
  yield Object.keys({ [this.key]() {}, [arguments[0]]() {} });
  yield Object.getOwnPropertyNames(class { static [this.key]() {} }).includes("outer");
}

expect([...inCatchPattern.call({ key: "outer" })]).toEqual([["outer"]]);
expect([...inBody.call({ key: "outer" }, "arg")]).toEqual([0, ["outer", "arg"], true]);
