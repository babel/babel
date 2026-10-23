const source = new Proxy(
  { skip: 0, keep: 1 },
  {
    getOwnPropertyDescriptor(target, key) {
      if (key === "skip") throw new Error("excluded descriptor observed");
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
  },
);
const { skip, ...rest } = source;
expect(rest).toEqual({ keep: 1 });
