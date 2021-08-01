var _privateMethod;

class Base {
  superMethod() {
    return 'good';
  }

}

class Sub extends Base {
  #privateMethod = _privateMethod ||= function () {
    return Base.prototype.superMethod.call(this);
  };

  superMethod() {
    return 'bad';
  }

  publicMethod() {
    return this.#privateMethod();
  }

}
