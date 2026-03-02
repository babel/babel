const v = 42;
const v2 = Infinity;
const v3 = NaN;
{
  let Infinity = 1;
  let NaN = 2;
  let StateEnum = /*#__PURE__*/function (StateEnum) {
    StateEnum[StateEnum["okay"] = 0] = "okay";
    StateEnum[StateEnum["neg"] = -Infinity] = "neg";
    StateEnum[StateEnum["pos"] = Infinity] = "pos";
    StateEnum[StateEnum["nan"] = NaN] = "nan";
    StateEnum[StateEnum["negReal"] = -Infinity] = "negReal";
    StateEnum[StateEnum["posReal"] = Infinity] = "posReal";
    StateEnum[StateEnum["nanReal"] = NaN] = "nanReal";
    StateEnum[StateEnum["ext"] = 42] = "ext";
    StateEnum[StateEnum["ext2"] = Infinity] = "ext2";
    StateEnum[StateEnum["ext3"] = NaN] = "ext3";
    return StateEnum;
  }({});
}
