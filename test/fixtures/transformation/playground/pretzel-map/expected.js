"use strict";

var _args;
["foo", "bar"].map(function (_val) {
  return _val.toUpperCase();
});
[1.1234, 23.53245, 3].map(function (_val2) {
  return _val2.toFixed(2);
});

var get = function () {
  return 2;
};
[1.1234, 23.53245, 3].map((_args = [get()], function (_val3) {
  return _val3.toFixed(_args[0]);
}));
