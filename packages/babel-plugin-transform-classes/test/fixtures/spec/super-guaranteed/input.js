class Base {};

new class extends Base {
  constructor() {
    super() || null;
  }
}

new class extends Base {
  constructor() {
    super()?.();
  }
}

new class extends Base {
  constructor() {
    super()?.[null];
  }
}

new class extends Base {
  constructor() {
    1 + super();
  }
}
