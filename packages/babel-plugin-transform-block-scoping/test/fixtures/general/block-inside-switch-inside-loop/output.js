// it shouldn't break on a case-break statement
var i;
var _loop = function () {
  switch (i) {
    case 1:
      break;
  }
  var z = 3; // to force the plugin to convert to loop function call
  (function () {
    return z;
  });
};
for (i = 0; i < 10; i++) {
  _loop();
}
expect(i).toBe(10);

// it should continue on continue statements within switch
var j = 0;
var _loop2 = function () {
  switch (i) {
    case 0:
      return 1; // continue
  }
  j++;
  var z = 3;
  (function () {
    return z;
  });
};
for (i = 0; i < 10; i++) {
  if (_loop2()) continue;
}
expect(j).toBe(9);

// it should work with loops nested within switch
j = 0;
var _loop3 = function () {
    switch (i) {
      case 0:
        var _loop4 = function () {
          var z = 3;
          (function () {
            return z;
          });
          j++;
          return 1; // break
        };
        for (k = 0; k < 10; k++) {
          if (_loop4()) break;
        }
        break;
    }
    var z = 3;
    (function () {
      return z;
    });
  },
  k;
for (i = 0; i < 10; i++) {
  _loop3();
}
expect(j).toBe(1);
