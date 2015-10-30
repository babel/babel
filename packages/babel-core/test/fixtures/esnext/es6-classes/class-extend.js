class Animal {
  sayHi() {
    return 'Hi, I am a '+this.type()+'.';
  }
}

class Dog extends Animal {
  type() { return 'dog'; }

  sayHi() {
    return super.sayHi() + ' WOOF!';
  }
}

assert.equal(new Dog().sayHi(), 'Hi, I am a dog. WOOF!');
