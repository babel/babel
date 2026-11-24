const bar = { fromBar: 1 };

const method = {
  __proto__() {
    return "method";
  },
  a: 1,
};
expect(Object.getPrototypeOf(method)).toBe(Object.prototype);
expect(Object.hasOwn(method, "__proto__")).toBe(true);
expect(method.__proto__()).toBe("method");
expect(method.a).toBe(1);

const accessors = {
  get __proto__() {
    return "getter";
  },
  set __proto__(value) {},
};
expect(Object.getPrototypeOf(accessors)).toBe(Object.prototype);
const descriptor = Object.getOwnPropertyDescriptor(accessors, "__proto__");
expect(typeof descriptor.get).toBe("function");
expect(typeof descriptor.set).toBe("function");
expect(accessors.__proto__).toBe("getter");

const computed = {
  ["__proto__"]: bar,
};
expect(Object.getPrototypeOf(computed)).toBe(Object.prototype);
expect(Object.getOwnPropertyDescriptor(computed, "__proto__").value).toBe(bar);

{
  const __proto__ = bar;
  const shorthand = {
    __proto__,
  };
  expect(Object.getPrototypeOf(shorthand)).toBe(Object.prototype);
  expect(Object.getOwnPropertyDescriptor(shorthand, "__proto__").value).toBe(
    bar,
  );
}

const string = {
  "__proto__": bar,
};
expect(Object.hasOwn(string, "__proto__")).toBe(false);
expect(string.fromBar).toBe(1);
