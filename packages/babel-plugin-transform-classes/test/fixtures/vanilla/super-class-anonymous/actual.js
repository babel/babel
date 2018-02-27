class TestEmpty extends (class {}) {
}

class TestConstructorOnly extends (class { constructor() {} }) {
}

class TestMethodOnly extends (class { method() {} }) {
}

class TestConstructorAndMethod extends (class {
  constructor() {}
  method() {}
}) {
}

class TestMultipleMethods extends (class {
  m1() {}
  m2() {}
}) {}
