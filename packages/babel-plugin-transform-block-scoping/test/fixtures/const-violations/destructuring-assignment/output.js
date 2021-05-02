function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var a = 1,
    b = 2;
a = (_readOnlyError("a"), 3);
