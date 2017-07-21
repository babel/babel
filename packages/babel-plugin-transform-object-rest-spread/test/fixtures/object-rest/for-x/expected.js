// ForXStatement
for (var _a$b of []) {
  var {
    a
  } = _a$b,
      b = babelHelpers.objectWithoutProperties(_a$b, ["a"]);
}

for (_a$b2 of []) {
  var {
    a
  } = _a$b2,
      b = babelHelpers.objectWithoutProperties(_a$b2, ["a"]);
}

async function a() {
  for await (_a$b3 of []) {
    var {
      a
    } = _a$b3,
        b = babelHelpers.objectWithoutProperties(_a$b3, ["a"]);
  }
} // skip


for ({
  a
} in {}) {}

for ({
  a
} of []) {}

async function a() {
  for await ({
    a
  } of []) {}
}

for (a in {}) {}

for (a of []) {}

async function a() {
  for await (a of []) {}
}
