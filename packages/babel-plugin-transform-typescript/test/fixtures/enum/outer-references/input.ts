enum socketType {
  SOCKET,
  SERVER,
  IPC,
}

enum constants {
  SOCKET = socketType.SOCKET,
  SERVER = socketType.SERVER,
  IPC = socketType.IPC,
  UV_READABLE,
  UV_WRITABLE,
}
