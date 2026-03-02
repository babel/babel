function foo() {
  const x = 1 ? a() : b();
  const y = a() || b();

  return [...x, ...y];
}

function a(): Array<number> {
  return [];
}

function b(): Array<number> {
  return [];
}
