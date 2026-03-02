// ForXStatement
{
  let a, b;
  for (const [{a, ...b}] of []) {}
  for ([{a, ...b}] of []) {}
  async function f() {
    for await ([{a, ...b}] of []) {}
  }

  for (const { a: [{a, ...b}] } of []) {}
}

// skip
{
  for ([{a}] in {}) {}
  for ([{a}] of []) {}
  async function a() {
    for await ([{a}] of []) {}
  }
}
{
  for ([a, ...b] in {}) {}
  for ([a, ...b] of []) {}
  async function a() {
    for await ([a, ...b] of []) {}
  }
}
