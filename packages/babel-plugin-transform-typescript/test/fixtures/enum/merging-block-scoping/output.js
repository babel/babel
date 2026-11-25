var Flags = /*#__PURE__*/function (Flags) {
  Flags[Flags["Outer"] = 8] = "Outer";
  return Flags;
}(Flags || {});
function parse(kind) {
  if (kind > 0) {
    var _Flags = /*#__PURE__*/function (Flags) {
      Flags[Flags["None"] = 0] = "None";
      Flags[Flags["Read"] = 1] = "Read";
      return Flags;
    }({});
    _Flags = /*#__PURE__*/function (_Flags) {
      _Flags[_Flags["Write"] = 2] = "Write";
      _Flags[_Flags["ReadWrite"] = 3] = "ReadWrite";
      return _Flags;
    }(_Flags || {});
    return _Flags;
  }
}
function nested() {
  {
    var _Flags2 = function (Flags) {
      Flags[Flags["Inner"] = Outer] = "Inner";
      return Flags;
    }({});
    return _Flags2;
  }
}
