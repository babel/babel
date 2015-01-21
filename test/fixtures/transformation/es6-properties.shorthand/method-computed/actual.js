var x = "y";
var valueSet;
var obj = {
  get [x] () { return 1 },
  set [x] (value) { valueSet = value }
};
obj.y = "foo";
obj.y === 1 && valueSet === "foo";
