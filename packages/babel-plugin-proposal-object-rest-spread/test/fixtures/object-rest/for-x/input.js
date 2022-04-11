// ForXStatement
for (var {a, ...b} of []) {}
for ({a, ...b} of []) {}
async function a() {
  for await ({a, ...b} of []) {}
}

// skip
for ({a} in {}) {}
for ({a} of []) {}
async function a() {
  for await ({a} of []) {}
}

for (a in {}) {}
for (a of []) {}
async function a() {
  for await (a of []) {}
}
