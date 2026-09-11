function testLeaked() {
  var fn;
  for (var i = 0; i < 2; i++) {
    for (let x = (fn = () => x, i); i === 0; ) {
      var leaked = 5;
      break;
    }
  }
  return {
    leaked: leaked,
    fn: fn(),
  };
}

expect(testLeaked()).toEqual({ leaked: 5, fn: 1 });
