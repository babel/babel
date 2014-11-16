function *usingThrow() {
  try {
    try {
      try {
        throw "thrown";
      } finally {
        yield 1;
      }
    } catch (thrown) {
      yield thrown;
    } finally {
      yield 2;
    }
  } finally {
    yield 3;
  }
}

function *usingRaise() {
  try {
    try {
      try {
        genHelpers.raise("thrown");
      } finally {
        yield 1;
      }
    } catch (thrown) {
      yield thrown;
    } finally {
      yield 2;
    }
  } finally {
    yield 3;
  }
}

// should statically execute in order
genHelpers.check(usingThrow(), [1, "thrown", 2, 3]);

// should dynamically execute in order
genHelpers.check(usingRaise(), [1, "thrown", 2, 3]);
