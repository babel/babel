class Bar {
  test() {
    // pass
    (() => {
      assert.strictEqual(this.constructor, Bar);
    })();

    // pass
    (() => {
      assert.strictEqual(this.constructor, Bar);
    }).call(this);

    (async () => {
      assert.strictEqual(this.constructor, Bar);
    })();

    (async () => {
      assert.strictEqual(this.constructor, Bar);
    }).call(this);
  }
}

(new Bar()).test();
