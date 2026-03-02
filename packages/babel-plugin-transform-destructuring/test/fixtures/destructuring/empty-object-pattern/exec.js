expect(function () {
  var {} = null;
}).toThrow("Cannot destructure null");
