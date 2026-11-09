var _staticBlock;
var Socket = (class extends EventTarget {
  constructor() {
    var _this;
    super();
    _this = this;
    queueMicrotask(/*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
      yield Promise.resolve();
      _this.ready = true;
    }));
  }
  static #_ = _staticBlock = () => (babelHelpers.setFunctionName(this, "Socket"), this.CONNECTING = 0, this);
}, _staticBlock());
new Socket();
