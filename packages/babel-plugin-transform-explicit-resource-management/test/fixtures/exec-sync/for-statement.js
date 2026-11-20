const dispose = Symbol.dispose || Symbol.for("Symbol.dispose");
const log = [];
const resource = name => ({
  [dispose]() {
    log.push(`dispose ${name}`);
  }
});

outer: for (using x = resource("x"), y = resource("y"); log.length < 6; ) {
  log.push(`body ${log.length}`);
  for (using z = resource("z"); ; ) {
    continue outer;
  }
}

expect(log).toEqual([
  "body 0",
  "dispose z",
  "body 2",
  "dispose z",
  "body 4",
  "dispose z",
  "dispose y",
  "dispose x",
]);
