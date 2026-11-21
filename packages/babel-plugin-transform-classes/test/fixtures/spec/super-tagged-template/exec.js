class Base {
  tag(strings) {
    return [this, strings[0]];
  }
  static tag(strings) {
    return [this, strings[0]];
  }
}

class Derived extends Base {
  method() {
    return super.tag`a`;
  }
  computed(key) {
    return super[key]`b`;
  }
  static method() {
    return super.tag`c`;
  }
}

const obj = new Derived();
expect(obj.method()).toEqual([obj, "a"]);
expect(obj.computed("tag")).toEqual([obj, "b"]);
expect(Derived.method()).toEqual([Derived, "c"]);
