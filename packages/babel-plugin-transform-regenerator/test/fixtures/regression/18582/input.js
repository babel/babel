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
  return x;
}
