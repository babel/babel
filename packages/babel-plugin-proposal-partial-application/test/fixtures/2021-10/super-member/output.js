class A extends B {
  m() {
    return ((_super$f, _this) => function (_argPlaceholder) {
      return _super$f.call(_this, _argPlaceholder);
    })(super.f, this);
  }
}
