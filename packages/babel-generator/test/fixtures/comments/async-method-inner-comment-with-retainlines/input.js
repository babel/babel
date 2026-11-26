class A {
  async *a(
    // 1
  ) {}

  async [b](
    // 2
  ) {}

  async [c]
  /* 3 */
  () {}
}

var o = {
  async *a(
    // 4
  ) {},

  async [b](
    // 5
  ) {},

  async [c]
  /* 6 */
  () {}
};
