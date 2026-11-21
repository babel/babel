async function* a() {
  for (let i = 0; i < 3; i++) {
    const fn = () => i;
    try {
      yield fn();
    } finally {
      await null;
    }
  }
}

class C {
  async *m() {
    for (let i = 0; i < 2; i++) {
      const fn = () => this.x + i;
      yield fn();
    }
  }
}

async function* nested() {
  for (let i = 0; i < 2; i++) {
    const getI = () => i;
    for (let j = 0; j < 2; j++) {
      const getJ = () => getI() + j;
      yield getJ();
    }
  }
  function* syncInner() {
    for (let k = 0; k < 2; k++) {
      const getK = () => k;
      yield getK();
    }
  }
  return syncInner;
}
