// Angular needs to always compile async functions, even if
// the targets support class fields.
// https://github.com/babel/babel/issues/14749

class A {
  a = async () => this;
  b = async (x, y, z) => this;
}
