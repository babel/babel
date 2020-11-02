function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var MULTIPLIER = 5;

for (MULTIPLIER in arr) {
  _readOnlyError("MULTIPLIER");

  ;
}
