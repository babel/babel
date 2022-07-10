const dec = () => {}; 
class A extends B {
  constructor() {
    if (Math.random() > 0.5) {
      super(true);
    } else {
      super(false);
    }
  }

  @deco
  method() {}
}

class C extends B {
  constructor() {
    try {
      super(super(), null.x);
    } catch {}
  }

  @deco
  method() {}
}
