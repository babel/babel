// https://github.com/babel/babel/issues/18196
function omit(obj, spec) {
  const { [spec.key]: removed, ...rest } = obj;
  return rest;
}
expect(omit({ a: 1, b: 2 }, { key: "a" })).toEqual({ b: 2 });
