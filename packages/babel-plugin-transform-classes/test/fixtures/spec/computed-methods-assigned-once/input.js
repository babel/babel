var once, twice, later, init = a();
once = a();
twice = b();
twice = c();
class A {
  [once]() {}
  [twice]() {}
  [later]() {}
  [init]() {}
}
later = d();
