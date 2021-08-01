var _client = /*#__PURE__*/new WeakMap();

class Foo {
  constructor(props) {
    _client.set(this, void 0);

    [x, ...babelHelpers.classInstancePrivateFieldDestructureSet2(this, _client)._] = props;
  }

}
