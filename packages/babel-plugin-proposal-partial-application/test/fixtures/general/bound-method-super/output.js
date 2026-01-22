class Sign {
  constructor(sign) {
    this.sign = sign;
  }
  getSign() {
    return this.sign;
  }
}
class Partial extends Sign {
  constructor(sign) {
    var _this$compare, _this;
    super(sign);
    this.compare = (_this = this, _this$compare = this.compare, function compare(_argPlaceholder, _argPlaceholder2) {
      return _this$compare.call(_this, _argPlaceholder, _argPlaceholder2);
    });
  }
  getSign() {
    return this.sign * 2;
  }
  compare(a, b) {
    if (a > b) {
      return super.getSign();
    }
  }
}
