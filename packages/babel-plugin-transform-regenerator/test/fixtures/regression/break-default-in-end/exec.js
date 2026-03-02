function* gen(type) {
  switch (type) {
    default:
      break;
  }
}

expect(gen(1).next().done).toBe(true);

function* gen2(type) {
  switch (type) {
    case 0:
      throw "unreachable";
    default:
      break;
  }
}

expect(gen2(1).next().done).toBe(true);
