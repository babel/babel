const obj = {
  as() {
    return (super.m as any)();
  },
  nonNull() {
    return super.m!();
  },
  optional() {
    return (super.m as any)?.();
  },
};
