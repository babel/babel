function foo() {
  while (true) {
    switch (2) {
      case 0: {
        if (true) {
          return;
        }

        const stuff = new Map();
        const data = 0;
        stuff.forEach(() => {
          const d = data;
        });
        break;
      }
    }
  }
}
