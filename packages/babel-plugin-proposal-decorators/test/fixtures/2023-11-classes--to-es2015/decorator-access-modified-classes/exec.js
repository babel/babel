function decorateA(target) {
  return class extends target {
    a() {
      return "a";
    }
  };
}

function decorateB(target) {
  return class extends target {
    b() {
      return "b";
    }
  };
}

@decorateB
@decorateA
class Target {}

const target = new Target();
expect(target.a()).toBe("a");
expect(target.b()).toBe("b");
