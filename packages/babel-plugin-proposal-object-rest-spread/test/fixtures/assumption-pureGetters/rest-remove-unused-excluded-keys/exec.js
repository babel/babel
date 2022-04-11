let called = false;
let obj = {
  get foo() { called = true }
};

let { foo, ...rest } = obj;

expect("foo" in rest).toBe(false);

// Without assuming that getters are pure (in this case it isn't), this should be true
expect(called).toBe(false);
