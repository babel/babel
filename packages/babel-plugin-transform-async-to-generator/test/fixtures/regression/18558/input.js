var Socket = class extends EventTarget {
  static {
    this.CONNECTING = 0;
  }

  constructor() {
    super();
    queueMicrotask(async () => {
      await Promise.resolve();
      this.ready = true;
    });
  }
};

new Socket();
