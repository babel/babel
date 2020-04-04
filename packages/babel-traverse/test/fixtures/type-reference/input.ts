function bug() {
  const x = 1 ? a() : b();

  return [...x];
}

function a(): number[] {
  return [];
}

function b(): number[] {
  return [];
}
