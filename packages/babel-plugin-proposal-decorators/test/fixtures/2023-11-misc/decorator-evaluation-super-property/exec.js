function noop() {}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      class C {
        @(receivedName = super.name, noop) p;
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      class C {
        @(receivedName = super.name, noop) #p;
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      class C {
        @(receivedName = super.name, noop) accessor [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      @noop
      class C {
        @(receivedName = super.name, noop) p;
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      @noop
      class C {
        @(receivedName = super.name, noop) static p;
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      @noop
      class C {
        @(receivedName = super.name, noop) #p;
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      @noop
      class C {
        @(receivedName = super.name, noop) [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      @noop
      class C {
        @(receivedName = super.name, noop) static [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      @noop
      class C {
        @(receivedName = super.name, noop) accessor [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}

{
  let receivedName;
  class B extends class A {} {
    static m() {
      @noop
      class C {
        @(receivedName = super.name, noop) static accessor [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(receivedName).toBe("A");
}
