// ensure we test the helper implementation,
// not built-in Reflect.get to which it defers
delete Reflect;

class Target {
  get receiver() {
    return this;
  }
};

// check that the 1st argument (target) *is* used
// in place of missing 3rd argument (receiver)
expect(HELPER_GET(new Target, "receiver")).toBeInstanceOf(Target);

// because the helper replaces itself upon invocation,
// check it again with the same arguments
expect(HELPER_GET(new Target, "receiver")).toBeInstanceOf(Target);
