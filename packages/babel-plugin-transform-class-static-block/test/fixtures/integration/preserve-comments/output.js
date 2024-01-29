var _C;
class C {}
_C = C;
/* before 1 */
(() => {})();
/* after 1 */
/* before 2 */
/* before this.foo */_C.foo = 42;
/* after this.foo */
/* after 2 */
/* before 3 */
(() => {
  /* before this.bar */
  _C.bar = 42;
  _C.bar = 42;
  /* after this.bar */
})();
/* after 3 */
