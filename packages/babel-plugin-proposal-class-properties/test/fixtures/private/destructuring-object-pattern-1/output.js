function _classPrivateFieldDestructureSet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.set) { if (!("__destrObj" in descriptor)) { descriptor.__destrObj = { set value(v) { descriptor.set.call(receiver, v); } }; } return descriptor.__destrObj; } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } return descriptor; } }

var Foo = function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _client.set(this, {
    writable: true,
    value: void 0
  });

  babelHelpers.classPrivateFieldSet(this, _client, 'foo');
  ;
  ({
    x: this.x = babelHelpers.classPrivateFieldGet(this, _client),
    y: _classPrivateFieldDestructureSet(this, _client).value,
    z: this.z = babelHelpers.classPrivateFieldGet(this, _client)
  } = props);
};

var _client = new WeakMap();
