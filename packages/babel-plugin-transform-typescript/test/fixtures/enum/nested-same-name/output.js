var Status = /*#__PURE__*/function (Status) {
  Status[Status["Ok"] = 200] = "Ok";
  Status[Status["A"] = 100] = "A";
  return Status;
}(Status || {});
function make() {
  const Ok = "local";
  let Status = /*#__PURE__*/function (Status) {
    Status["Msg"] = "local";
    Status[Status["A"] = 1] = "A";
    Status[Status["B"] = 2] = "B";
    return Status;
  }({});
  return Status;
}
{
  const Ok = 5;
  let Status = /*#__PURE__*/function (Status) {
    Status[Status["Twice"] = 10] = "Twice";
    return Status;
  }({});
}
var Later = /*#__PURE__*/function (Later) {
  Later[Later["X"] = 100] = "X";
  return Later;
}(Later || {});
