var _y;

class A {
  #y = _y || (_y = function () {});
  x = this.#y();
}
