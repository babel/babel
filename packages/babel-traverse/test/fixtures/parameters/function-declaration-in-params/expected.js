const val = function f(_a, ..._ref) {
  let [b = () => {
    let [] = [];
    return _a;
  }] = [..._ref];
  {
    let a = _a;

    assert.equal(a, 1);
    a = "this value is inaccisible to b";
    return b();
  }
}(1);

assert.equal(val, 1);