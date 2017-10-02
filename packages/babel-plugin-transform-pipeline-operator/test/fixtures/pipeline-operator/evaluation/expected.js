var _obj$prop;

var obj = {
  get prop() {
    return this._prop = 1;
  },

  get method() {
    if (!this._prop) throw new Error('invalid evaluation order');
    return v => v;
  }

};
var result = (_obj$prop = obj.prop, obj.method(_obj$prop));
assert.equal(result, 1);
