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
} = {};
