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

expect(C.method()).toEqual([C, 'B.method']);;
expect(C.getter).toEqual([C, 'B.getter']);;

C.setter = 'B.setter';
expect(x).toEqual([C, 'B.setter']);;
