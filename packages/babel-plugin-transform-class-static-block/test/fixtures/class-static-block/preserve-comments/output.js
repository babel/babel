var _staticBlock;
class C {
  static #_ = _staticBlock = () => ((/* before 1 */(() => {})()
  /* after 1 */
  /* before 2 */
  ), /* before this.foo */this.foo = 42
  /* after this.foo */

  /* after 2 */

  /* before 3 */, ((() => {
    /* before this.bar */
    this.bar = 42;
    this.bar = 42;
    /* after this.bar */
  })() /* after 3 */));
}
_staticBlock();
