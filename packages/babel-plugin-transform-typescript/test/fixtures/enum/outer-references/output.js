var socketType;
(function (socketType) {
  socketType[socketType["SOCKET"] = 0] = "SOCKET";
  socketType[socketType["SERVER"] = 1] = "SERVER";
  socketType[socketType["IPC"] = 2] = "IPC";
})(socketType || (socketType = {}));
var constants;
(function (constants) {
  constants[constants["SOCKET"] = socketType.SOCKET] = "SOCKET";
  constants[constants["SERVER"] = socketType.SERVER] = "SERVER";
  constants[constants["IPC"] = socketType.IPC] = "IPC";
  constants[constants["UV_READABLE"] = 1 + constants["IPC"]] = "UV_READABLE";
  constants[constants["UV_WRITABLE"] = 1 + constants["UV_READABLE"]] = "UV_WRITABLE";
})(constants || (constants = {}));
