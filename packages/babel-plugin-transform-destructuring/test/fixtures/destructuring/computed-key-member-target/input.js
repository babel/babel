({ [key()]: target.x } = source);
({ [key()]: target.x, [other()]: target.y } = source);

var id;
({ [key()]: id } = source);

({ nested: { x: target.x } } = source);
({ [key()]: { x: target.x } } = source);
({ nested: { x: id } } = source);

const constKey = "x";
({ [constKey]: target.x, ["y"]: target.y, [1]: target.z } = source);

const objKey = {};
({ [objKey]: target.x } = source);

({ x: target.x = 0 } = source);
({ [key()]: target.x = 0 } = source);
({ x: target[prop()] = 0 } = source);
({ x: this.x = 0 } = source);
[target.x = 0] = source;

const symKey = Symbol();
const symForKey = Symbol.for("key");
({ [symKey]: target.x, [symForKey]: target.y } = source);

({
  m() {
    ({ x: super.x = 0, y: super[prop()] = 0 } = source);
  },
});
