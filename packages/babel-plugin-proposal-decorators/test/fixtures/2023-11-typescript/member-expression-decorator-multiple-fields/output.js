let _initClass, _classDecs, _targetDecs, _init_target, _init_extra_target;
const seen = [];
const lib = {
  dec: () => (_, context) => {
    seen.push(context.name);
  }
};
_classDecs = [lib.dec()];
let _Example;
class Example {
  static {
    ({
      e: [_init_target, _init_extra_target],
      c: [_Example, _initClass]
    } = babelHelpers.applyDecs2311(this, _classDecs, [[_targetDecs, 0, "target"]]));
  }
  constructor() {
    _init_extra_target(this);
  }
  [(_targetDecs = lib.dec(() => _Example), "target")] = _init_target(this, 2);
  static {
    _initClass();
  }
}
new _Example();
expect(seen).toEqual(["target", "Example"]);
