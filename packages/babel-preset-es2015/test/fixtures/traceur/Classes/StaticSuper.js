var x = 'B.getter';

class B {
  static method() {
    return [this, 'B.method'];
  }

  static get getter() {
    return [this, x];
  }

  static set setter(value) {
    x = [this, value];
  }
}

class C extends B {
  static method() {
    return super.method();
  }

  static get getter() {
    return super.getter;
  }

  static set setter(value) {
    super.setter = value;
  }
}

assertArrayEquals([C, 'B.method'], C.method());
assertArrayEquals([C, 'B.getter'], C.getter);

C.setter = 'B.setter';
assertArrayEquals([C, 'B.setter'], x);
