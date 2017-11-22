function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var a = 1,
    b = 2;
a = (_readOnlyError("a"), 3);
