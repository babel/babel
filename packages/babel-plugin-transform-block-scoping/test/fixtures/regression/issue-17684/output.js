// Test 1: switch(e)
function test(e) {
  var i = e;
  {
    var _e = i[0];
    switch (_e) {
      case "n":
        var _e2 = 1;
        return true;
      default:
        return false;
    }
  }
}
console.log(test("nn"));

// Test 2: switch(e.x)
function test2(e) {
  var i = e;
  {
    var _e3 = {
      x: "test"
    };
    switch (_e3.x) {
      case "test":
        var _e4 = 1;
        return true;
      default:
        return false;
    }
  }
}
console.log(test2({
  x: "n"
}));

// Test 3: switch(e.x + e.y)
function test3(e) {
  var i = e;
  {
    var _e5 = {
      x: "te",
      y: "st"
    };
    switch (_e5.x + _e5.y) {
      case "test":
        var _e6 = 1;
        return true;
      default:
        return false;
    }
  }
}
console.log(test3({
  x: "x",
  y: "y"
}));

// Test 4: switch(e.f())
function test4(e) {
  var i = e;
  {
    var _e7 = {
      f: () => "test"
    };
    switch (_e7.f()) {
      case "test":
        var _e8 = 1;
        return true;
      default:
        return false;
    }
  }
}
console.log(test4({
  f: () => "test"
}));
