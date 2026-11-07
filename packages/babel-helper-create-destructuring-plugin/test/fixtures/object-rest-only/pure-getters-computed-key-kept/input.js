function omit(obj, spec) {
  const { [spec.key]: removed, unused, ...rest } = obj;
  return rest;
}
