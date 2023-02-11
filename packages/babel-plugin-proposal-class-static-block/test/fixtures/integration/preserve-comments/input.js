class C {
  /* before 1 */
  static {}
  /* after 1 */

  /* before 2 */
  static {
    /* before this.foo */
    this.foo = 42;
    /* after this.foo */
  }
  /* after 2 */

  /* before 3 */
  static {
    /* before this.bar */
    this.bar = 42;
    this.bar = 42;
    /* after this.bar */
  }
  /* after 3 */
}
