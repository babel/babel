var _client = /*#__PURE__*/new WeakMap();

class Foo {
  constructor(props) {
    _client.set(this, void 0);

    babelHelpers.classPrivateFieldSet2(this, _client, 1);
    [this.x = babelHelpers.classPrivateFieldGet2(this, _client), babelHelpers.classInstancePrivateFieldDestructureSet2(this, _client)._, this.y = babelHelpers.classPrivateFieldGet2(this, _client)] = props;
  }

}
