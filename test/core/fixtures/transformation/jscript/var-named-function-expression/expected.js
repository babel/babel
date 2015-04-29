"use strict";

var IdenticalName = (function () {
  function IdenticalName(x) {
    return x;
  }

  return IdenticalName;
})();

var DifferentNameA = function DifferentNameB(x) {
  return x;
};
