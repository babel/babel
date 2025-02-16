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
  return y;
}
