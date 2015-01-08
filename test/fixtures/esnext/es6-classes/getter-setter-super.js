class Base {
  get sound() {
    return 'I am a ' + this.type + '.';
  }
}

class Animal extends Base {}

class Cat extends Animal {
  get type() { return 'cat'; }

  get sound() {
    return super.sound + ' MEOW!';
  }
}

assert.equal(new Cat().sound, 'I am a cat. MEOW!');
