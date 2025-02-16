async function p(x) {
  const y = effect(0) + do {
    if (effect(1)) {
      return x;
    }
    if (effect(2)) {
      const zz = effect(10) + do {
        if (effect(11)) {
          return x;
        }
        if (effect(12)) {
          11
        }
      } + effect(13);
      zz
    } else {
      2
    }
  } + effect(3);

  const obj = {
    [effect(1)]: effect(2),
    [effect(3)]: do { if (effect(4)) return 0 },
    [effect(5)]: effect(6),
  }

  return y;
}
