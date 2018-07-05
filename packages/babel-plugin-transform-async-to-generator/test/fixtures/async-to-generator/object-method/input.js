let obj = {
  a: 123,
  async foo(bar) {
    return await this.baz(bar);
  }
}
