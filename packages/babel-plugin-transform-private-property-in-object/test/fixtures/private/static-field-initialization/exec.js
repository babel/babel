const values = [];
let calls = 0;

class C {
  static {
    values.push(#field in this, #method in this, #accessor in this);
    values.push(#field in (++calls, this));
    expect(() => #field in (++calls, null)).toThrow(TypeError);
  }

  static #field = (values.push(#field in this), undefined);

  static {
    values.push(#field in this, #empty in this);
  }

  static #empty;

  static {
    values.push(#empty in this);
  }

  static #method() {}
  static get #accessor() {
    throw new Error("Brand checks must not invoke getters");
  }
}

expect(values).toEqual([false, true, true, false, false, true, false, true]);
expect(calls).toBe(2);
