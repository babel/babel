var obj = {
  get prop() {
    return this._prop = 1;
  },

  get method() {
    if (!this._prop) throw new Error('invalid evaluation order');
    return v => v;
  }

};
const _pipe = obj.prop;
var result = obj.method(_pipe);
expect(result).toBe(1);
