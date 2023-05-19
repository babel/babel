let log = [];

function disposable(name){
  return {
    [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
      log.push(name);
    }
  };
}

{
  using x = disposable("x");
  using y = disposable("y"), z = disposable("z");
  using w = disposable("w");
  log.push("body");
}

expect(log).toEqual(["body", "w", "z", "y", "x"]);
