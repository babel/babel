// Error: :4:9: Unexpected token ...

var object = {
  set x(...rest) {
    // rest is not allowed for set accessor
  }
};
