var source = 0;
{
  var _source;
  _source = {
    get a() {
      _source = {
        b: 2
      };
      return 1;
    },
    b: 1
  };
  var _source2 = _source,
    a = _source2.a,
    b = _source2.b;
  use(a, b);
}
