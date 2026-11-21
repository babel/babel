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
