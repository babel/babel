var asdf2 = { b: "b", c1: 1, c2: 2 };
var ads = Object.assign(["dd", "ee", "ff1", "ff2"], { bb: "bb", cc: "cc" });

// `export` is removed: the exec test isn't run as a module.
// ExportNamedDeclaration
var { b, ...c } = asdf2;
// Skip
var { bb, cc } = ads;
var [ dd, ee, ...ff ] = ads;

expect(b).toBe("b");
expect(c).toEqual({ c1: 1, c2: 2 });
expect(bb).toBe("bb");
expect(cc).toBe("cc");
expect(dd).toBe("dd");
expect(ee).toBe("ee");
expect(ff).toEqual(["ff1", "ff2"]);
