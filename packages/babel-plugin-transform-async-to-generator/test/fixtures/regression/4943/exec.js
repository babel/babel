function mandatory(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}

function shouldNotHappen() {
  throw new Error("should not happen");
}

async function foo({ a, b = mandatory("b") } = {}) {
  return Promise.resolve(b);
}

async function bar(a = mandatory("a"), b = mandatory("b")) {
  return Promise.resolve(b);
}

assert.doesNotThrow(() => {
  foo().then(() => true).catch(() => true);
});

assert.doesNotThrow(() => {
  bar().then(() => true).catch(() => true);
});

async function fooUsage() {
  try {
    await foo().then(shouldNotHappen);
  } catch (err) {
    assert.equal(err.message, "Missing parameter: b");
  }
};

async function barUsage() {
  try {
    await bar().then(shouldNotHappen);
  } catch (err) {
    assert.equal(err.message, "Missing parameter: a");
  }
}

fooUsage().catch((err) => {
  if (err instanceof AssertionError) {
    throw err;
  }
});

barUsage().catch((err) => {
  if (err instanceof AssertionError) {
    throw err;
  }
});
