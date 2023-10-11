var _class;
class C {}
_class = C;
/* before 1 */
(() => {})();
/* after 1 */
/* before 2 */
/* before this.foo */_class.foo = 42;
/* after this.foo */
/* after 2 */
/* before 3 */
(() => {
  /* before this.bar */
  _class.bar = 42;
  _class.bar = 42;
  /* after this.bar */
})();
/* after 3 */
