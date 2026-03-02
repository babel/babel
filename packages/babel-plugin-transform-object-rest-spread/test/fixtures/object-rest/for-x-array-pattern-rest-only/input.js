// ForXStatement
{
  let a;
  for (const [{...a}] of []) {}
  for ([{...a}] of []) {}
  async function f() {
    for await ([{...a}] of []) {}
  }
}

// skip
{
  for ([...a] in {}) {}
  for ([...a] of []) {}
  async function a() {
    for await ([...a] of []) {}
  }
}
