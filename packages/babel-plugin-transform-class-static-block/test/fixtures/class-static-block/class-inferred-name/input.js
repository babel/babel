let Foo = class {
  static {
    expect(this.name).toBe("Foo");
    if (false) use(this);
  }
};

let obj = {
  ["someName"]: class {
    static x = expect(this.name).toBe("someName");
    static {
      if (false) use(this);
      expect(this.name).toBe("someName");
    }
  }
};

expect(Foo.name).toBe("Foo");
expect(obj.someName.name).toBe("someName");
