function f(x, y, z) {
  const t = (effects.push(0), 1) + do {
    if (effects.push(1), x) {
      return 'x';
    }
    if (effects.push(2), y) {
      const t = (effects.push(10), 10) + do {
        if (effects.push(11), z) {
          return 'z';
        }
        20
      } + (effects.push(12), 30);
      t
    } else {
      30
    }
  } + (effects.push(3), 100);
  return t;
}
