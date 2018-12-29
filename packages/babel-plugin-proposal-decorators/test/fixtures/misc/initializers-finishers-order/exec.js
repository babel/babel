function addFinisher(finisher) {
  return desc => { desc.finisher = finisher };
}

function addElement(el) {
  return desc => { desc.elements.push(el) };
}

const log = [];
const logger = v => () => { log.push(v) }

@addElement({
  kind: "initializer",
  placement: "static",
  initializer: logger("static1")
})
@addElement({
  kind: "initializer",
  placement: "own",
  initializer: logger("own1")
})
@addElement({
  kind: "initializer",
  placement: "prototype",
  initializer: logger("prototype1")
})
@addFinisher(logger("finisher1"))
@addFinisher(logger("finisher2"))
@addElement({
  kind: "initializer",
  placement: "own",
  initializer: logger("own2")
})
@addElement({
  kind: "initializer",
  placement: "prototype",
  initializer: logger("prototype2")
})
@addElement({
  kind: "initializer",
  placement: "static",
  initializer: logger("static2")
})
class A {}

expect(log).toEqual(["static2", "prototype2", "prototype1", "static1", "finisher2", "finisher1"]);

new A();
expect(log).toEqual(["static2", "prototype2", "prototype1", "static1", "finisher2", "finisher1", "own2", "own1"]);
