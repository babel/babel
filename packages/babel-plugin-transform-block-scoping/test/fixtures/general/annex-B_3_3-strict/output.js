function testStrict() {
  "use strict";

  if (true) {
    var _inner = function () {
      console.log('inner true');
    };
  } else {
    var _inner2 = function () {
      console.log('inner false');
    };
  }
  inner();
}
class Test {
  test() {
    if (true) {
      var _inner3 = function () {
        console.log('inner true');
      };
    } else {
      var _inner4 = function () {
        console.log('inner false');
      };
    }
    inner();
  }
}
function testNonStrict() {
  if (true) {
    function inner() {
      console.log('inner true');
    }
  } else {
    function inner() {
      console.log('inner false');
    }
  }
  inner();
}
