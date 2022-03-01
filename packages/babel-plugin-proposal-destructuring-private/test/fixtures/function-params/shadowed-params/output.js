class C {
  #x;

  m(_p, _p2, ..._p3) {
    var a = _p,
        x = _p2.#x,
        b = _p3;
    return function (a) {
      var a = 1;
    }(a);
  }

}
