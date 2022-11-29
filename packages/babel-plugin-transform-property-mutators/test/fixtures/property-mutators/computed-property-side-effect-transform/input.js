let foo = 0;
var obj = {
  [foo++]: 1,
  get [foo++]() {
    return 5 + 5;
  },
  set [foo++](value) {
    this._foo = value;
  }
};
