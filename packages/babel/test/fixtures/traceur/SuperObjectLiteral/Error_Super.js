// Error: :8:17: Unexpected token ;

var p = {};

var o = {
  __proto__: p,
  method() {
    return super;
  }
};
