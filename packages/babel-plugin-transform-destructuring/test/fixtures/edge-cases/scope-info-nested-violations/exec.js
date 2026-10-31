// As is, `o` is undefined and the destructuring throws.
expect(() => {
  var x, y, o;
  var {
    a = function () {
      for (x of y);
      var z;
      var z;
    },
  } = o;
}).toThrow(TypeError);

var y = ["y1", "y2"];
var o = {};

var x, y, o;
var {
  a = function () {
    for (x of y);
    var z;
    var z;
  },
} = o;

expect(typeof a).toBe("function");
expect(a.name).toBe("a");
expect(x).toBeUndefined();
expect(a()).toBeUndefined();
expect(x).toBe("y2");
