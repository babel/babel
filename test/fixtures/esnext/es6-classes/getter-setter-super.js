class Base {
  get sound() {
    return 'I am a ' + this.type + '.';
  }

  get name() {
    return this._name;
  }

  set name(val) {
    this._name = val;
  }
}

class Animal extends Base {}

class Cat extends Animal {
  get type() { return 'cat'; }

  get sound() {
    return super.sound + ' MEOW!';
  }

  get name() {
    return super.name;
  }

  set name(val) {
    super.name = val;
    this._name += ' Cat';
  }
}

var cat = new Cat();

assert.equal(cat.sound, 'I am a cat. MEOW!');
cat.name = 'Nyan';
assert.equal(cat.name, 'Nyan Cat');
