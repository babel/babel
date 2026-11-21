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

async function* withoutFinally() {
  for (let i = 0; i < 3; i++) {
    const fn = () => i;
    yield fn();
  }
  for (let i = 0; i < 3; i++) {
    const fn = () => i;
    try {
      yield fn();
    } catch (e) {
      yield e;
    }
  }
  for (let i = 0; i < 3; i++) {
    const fn = () => {
      try {
        return i;
      } finally {
        sideEffect();
      }
    };
    yield fn();
  }
}

class C {
  async *m() {
    for (let i = 0; i < 2; i++) {
      const fn = () => this.x + i;
      try {
        yield fn();
      } finally {
        await null;
      }
    }
  }
  async *mPlain() {
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
      try {
        yield getJ();
      } finally {
        await null;
      }
    }
  }
  for (let i = 0; i < 2; i++) {
    const getI = () => i;
    try {
      for (let j = 0; j < 2; j++) {
        const getJ = () => getI() + j;
        yield getJ();
      }
    } finally {
      await null;
    }
  }
  function* syncInner() {
    for (let k = 0; k < 2; k++) {
      const getK = () => k;
      try {
        yield getK();
      } finally {
        cleanup();
      }
    }
  }
  return syncInner;
}
