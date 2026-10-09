let log = [];
let Symbol$dispose = Symbol.dispose || Symbol.for("Symbol.dispose");
{
  using foo = class { static [Symbol$dispose]() { log.push(`${foo.name} is disposed`) } }
  log.push(foo.name);
}

expect(log).toEqual(["foo", "foo is disposed"])
