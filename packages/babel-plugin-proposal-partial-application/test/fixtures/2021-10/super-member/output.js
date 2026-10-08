class A extends B {
  m() {
    return ((_super$f, _this) => function (_argPlaceholder) {
      return _super$f.call(_this, _argPlaceholder);
    })(super.f, this);
  }
  n() {
    return ((_super$key, _this2) => function (_argPlaceholder2) {
      return _super$key.call(_this2, _argPlaceholder2);
    })(super[key], this);
  }
}
