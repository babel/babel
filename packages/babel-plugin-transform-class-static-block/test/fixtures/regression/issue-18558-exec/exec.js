class Base {}

var Socket = class extends Base {
  static {
    this.CONNECTING = 0;
  }

  constructor() {
    super();
    // The async arrow body runs synchronously until the first await.
    (async () => {
      this.self = this;
    })();
  }
};

const socket = new Socket();
expect(Socket.CONNECTING).toBe(0);
expect(socket.self).toBe(socket);
