let _targetDecs, _init_target, _init_extra_target;
const seen = [];
const lib = {
  dec: () => (_, context) => {
    seen.push(context.name);
  }
};
class Example {
  static {
    [_init_target, _init_extra_target] = babelHelpers.applyDecs2311(this, [], [[_targetDecs, 0, "target"]]).e;
  }
  constructor() {
    _init_extra_target(this);
  }
  [(_targetDecs = lib.dec(() => Example), "target")] = _init_target(this, 2);
}
new Example();
expect(seen).toEqual(["target"]);
