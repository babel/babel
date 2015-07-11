function* x() {
  for (let a of []) {
    for (let b of a) {
      yield 1;
    }
  }
}

function y() {
  return [...x()];
}

export { y };
