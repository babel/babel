class Foo {
}

class Foo2 extends Foo {
  constructor(private readonly incoming: number) {}
  value = this.incoming;
}

class Foo3 extends Foo {
  constructor(private readonly incoming: number) {
    super();
  }
  value = this.incoming;
}

class Foo4 extends Foo {
  constructor(private readonly incoming: number) {
    if (1) {
      super();
    } else {
      super();
    }
  }
  value = this.incoming;
}
