class C {}
/* before 1 */
(() => {})();
/* after 1 */
/* before 2 */
/* before this.foo */C.foo = 42;
/* after this.foo */
/* after 2 */
/* before 3 */
(() => {
  /* before this.bar */
  C.bar = 42;
  C.bar = 42;
  /* after this.bar */
})();
/* after 3 */
