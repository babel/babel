class A {
  get 1() {}
  set [1](_) {}

  get 2() {}
  set "2"(_) {}

  get 3n() {}
  set 3(_) {}

  get [4n]() {}
  set "4"(_) {}

  // Different keys
  get 5n() {}
  set "5n"(_) {}
}
