function* g() {
  var o = {
    *[yield function.sent]() {
      yield function.sent;
    }
  };
}
