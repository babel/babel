function argsOf(...values) {
  return values;
}

const obj = {
  method(...args) {
    return [this, args];
  },
};

const [context, args] = obj.method(1, ...argsOf(2, 3), 4);
expect(context).toBe(obj);
expect(args).toEqual([1, 2, 3, 4]);
