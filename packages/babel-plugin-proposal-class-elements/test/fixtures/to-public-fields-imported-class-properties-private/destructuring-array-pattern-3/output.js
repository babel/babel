var _client = /*#__PURE__*/new WeakMap();

class Foo {
  constructor(props) {
    _client.set(this, void 0);

    [babelHelpers.classInstancePrivateFieldDestructureSet2(this, _client)._ = 5] = props;
  }

}
