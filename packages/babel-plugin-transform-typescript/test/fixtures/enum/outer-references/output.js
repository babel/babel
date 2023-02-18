var socketType;
(function (socketType) {
  socketType[socketType["SOCKET"] = 0] = "SOCKET";
  socketType[socketType["SERVER"] = 1] = "SERVER";
  socketType[socketType["IPC"] = 2] = "IPC";
})(socketType || (socketType = {}));
var constants;
(function (constants) {
  constants[constants["SOCKET"] = 0] = "SOCKET";
  constants[constants["SERVER"] = 1] = "SERVER";
  constants[constants["IPC"] = 2] = "IPC";
  constants[constants["UV_READABLE"] = 3] = "UV_READABLE";
  constants[constants["UV_WRITABLE"] = 4] = "UV_WRITABLE";
})(constants || (constants = {}));
