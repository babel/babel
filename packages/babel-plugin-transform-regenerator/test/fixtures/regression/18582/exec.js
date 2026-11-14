function* f() {
  try {
    throw "outer";
  } catch (x) {
    try {
      throw "inner";
    } catch (x) {
      var x;
      yield x;
    }
    yield x;
  }
  yield x;
}
expect(Array.from(f())).toEqual(["inner", "outer", undefined]);

function* withInit() {
  try {
    throw "outer";
  } catch (x) {
    try {
      throw "inner";
    } catch (x) {
      var x = "reassigned";
      yield x;
    }
    yield x;
  }
  yield x;
}
expect(Array.from(withInit())).toEqual(["reassigned", "outer", undefined]);

function* forNoInit() {
  try {
    throw "outer";
  } catch (x) {
    try {
      throw "inner";
    } catch (x) {
      for (var x;;) {
        yield x;
        break;
      }
    }
    yield x;
  }
  yield x;
}
expect(Array.from(forNoInit())).toEqual(["inner", "outer", undefined]);

function* forOf() {
  try {
    throw "outer";
  } catch (x) {
    try {
      throw "inner";
    } catch (x) {
      for (var x of ["of"]) {
        yield x;
      }
      yield x;
    }
    yield x;
  }
  yield x;
}
expect(Array.from(forOf())).toEqual(["of", "of", "outer", undefined]);

function* nestedBlock() {
  try {
    throw "outer";
  } catch (x) {
    try {
      throw "inner";
    } catch (x) {
      if (true) {
        var x;
      }
      yield x;
    }
    yield x;
  }
  yield x;
}
expect(Array.from(nestedBlock())).toEqual(["inner", "outer", undefined]);

function* withParam(x) {
  try {
    throw "outer";
  } catch (x) {
    try {
      throw "inner";
    } catch (x) {
      var x;
      yield x;
    }
    yield x;
  }
  yield x;
}
expect(Array.from(withParam("param"))).toEqual(["inner", "outer", "param"]);

function* withBlockLetAndVar() {
  try {
    throw "outer";
  } catch (x) {
    try {
      throw "inner";
    } catch (x) {
      {
        let y = x;
        var x;
        yield [y, x];
      }
      yield x;
    }
    yield x;
  }
  yield x;
}
expect(Array.from(withBlockLetAndVar())).toEqual([
  ["inner", "inner"],
  "inner",
  "outer",
  undefined,
]);

async function asyncFn() {
  const results = [];
  try {
    throw "outer";
  } catch (x) {
    try {
      throw "inner";
    } catch (x) {
      var x;
      results.push(await x);
    }
    results.push(await x);
  }
  results.push(await x);
  return results;
}
return asyncFn().then(function (results) {
  expect(results).toEqual(["inner", "outer", undefined]);
});
