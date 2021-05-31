expect(() => {
  for (const a of [1]) {
    switch (true) {
      case true: {
        const b = 1;
        () => b;
        if (true) break;
        continue;
      }
      case false: {
        throw new Error("unreachable");
      }
    }
  }
}).not.toThrow();
