class Bar {
  test() {
    // pass
    (() => {
      expect(this.constructor).toBe(Bar);
    })();

    // pass
    (() => {
      expect(this.constructor).toBe(Bar);
    }).call(this);

    (async () => {
      expect(this.constructor).toBe(Bar);
    })();

    (async () => {
      expect(this.constructor).toBe(Bar);
    }).call(this);
  }
}

(new Bar()).test();
