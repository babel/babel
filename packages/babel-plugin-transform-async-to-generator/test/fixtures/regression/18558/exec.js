// `EventTarget` is not available in the fixture exec context.
class EventTarget {}

var Socket = class extends EventTarget {
  static {
    this.CONNECTING = 0;
  }

  constructor() {
    super();
    // `queueMicrotask` is not available in the fixture exec context;
    // `Promise.resolve().then` schedules the async arrow the same way.
    Promise.resolve().then(async () => {
      await Promise.resolve();
      this.ready = true;
    });
  }
};

const socket = new Socket();
expect(Socket.CONNECTING).toBe(0);

// The queued microtask awaits once before setting `ready`, so wait two
// microtask ticks before asserting.
return Promise.resolve()
  .then(() => Promise.resolve())
  .then(() => {
    expect(socket.ready).toBe(true);
  });
