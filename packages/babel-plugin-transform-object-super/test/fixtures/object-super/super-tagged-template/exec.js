const Base = {
  tag(strings) {
    return [this, strings[0]];
  },
};

const obj = {
  __proto__: Base,
  method() {
    return super.tag`a`;
  },
};

expect(obj.method()).toEqual([obj, "a"]);
