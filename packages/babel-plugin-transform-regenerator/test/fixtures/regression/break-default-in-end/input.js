function* iterate(type) {
  switch (type) {
    case 0:
      yield 0;
    default:
      break;
  }
}

expect(iterate(1).next().done).toBe(true);

