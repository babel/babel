function omit(obj, spec) {
  const { [spec.key]: unused, ...rest } = obj;
  return rest;
}

expect(omit({ a: 1, b: 2 }, { key: "a" })).toEqual({ b: 2 });
