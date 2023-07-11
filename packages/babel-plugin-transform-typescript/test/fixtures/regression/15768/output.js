const v = 42;
const v2 = Infinity;
var Infinity = 1; // Known inconsistencies
var StateEnum = /*#__PURE__*/function (StateEnum) {
  StateEnum[StateEnum["okay"] = 0] = "okay";
  StateEnum[StateEnum["neg"] = -Infinity] = "neg";
  StateEnum[StateEnum["pos"] = Infinity] = "pos";
  StateEnum[StateEnum["nan"] = NaN] = "nan";
  StateEnum[StateEnum["ext"] = 42] = "ext";
  StateEnum[StateEnum["ext2"] = 1] = "ext2";
  return StateEnum;
}(StateEnum || {});
