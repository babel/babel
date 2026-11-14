// https://tc39.es/ecma262/#sec-runtime-semantics-namedevaluation
var key = "name";
var {
  a = class {},
  b = class B {},
  c = class { static name = "own"; },
  d = class { static ["name"] = "computed"; },
  e = class { static [`name`] = "template"; },
  f = class { static [key] = "dynamic"; },
  g = class { static [0] = "zero"; },
  h = class { static "name" = "string"; },
  i = class { static [`na${"me"}`] = "template expression"; },
  j = class { static name() {} },
  k: l = class {},
  m: n = class N {},
  o: p = class { static name = "own"; },
  "q": r = class {},
  [key]: s = class {},
  t: { name: u } = class {},
} = {};
var v, w = {};
({ x: v = class {}, y: w.z = class {} } = {});
expect(a.name).toBe("a");
expect(b.name).toBe("B");
expect(c.name).toBe("own");
expect(d.name).toBe("computed");
expect(e.name).toBe("template");
expect(f.name).toBe("dynamic");
expect(g.name).toBe("g");
expect(h.name).toBe("string");
expect(i.name).toBe("template expression");
expect(typeof j.name).toBe("function");
// Named after the binding, not after the key
expect(l.name).toBe("l");
expect(n.name).toBe("N");
expect(p.name).toBe("own");
expect(r.name).toBe("r");
expect(s.name).toBe("s");
// Only identifier targets name the value
expect(u).toBe("");
expect(v.name).toBe("v");
expect(w.z.name).toBe("");
