class C {
  y = this.#x;
  #x;
}

assert.throws(() => {
  new C();
});
