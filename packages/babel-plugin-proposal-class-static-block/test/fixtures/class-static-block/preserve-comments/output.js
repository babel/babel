class C {
  /* before 1 */
  static #_ = (() => {})();
  /* after 1 */
  /* before 2 */
  static #_2 = /* before this.foo */
  this.foo = 42
  /* after this.foo */;
  /* after 2 */
  /* before 3 */
  static #_3 = (() => {
    /* before this.bar */
    this.bar = 42;
    this.bar = 42;
    /* after this.bar */
  })();
  /* after 3 */
}
