class Foo {
  method(Foo) {
    return super.method(Foo);
  }
}

class Bar {
  method() {
    return () => {
      let Bar;
      return super.method(Bar);
    };
  }
}

class Baz {
  method() {
    class Baz {
      f() {
        let Baz = 1;
        return Baz;
      }
    }

    return super.method(Baz)
  }
}