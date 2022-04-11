@dec
class B extends A {
  constructor() {
    const foo = () => { super(); };

    if (a) { super(); }
    else { foo(); }

    while (0) { super(); }

    super();
  }
}

