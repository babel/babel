// Options: --block-binding
// Error: :8:18: Unexpected token of

function* gen() {
  yield 1;
}

for (const i = 0 of gen()) {
}
