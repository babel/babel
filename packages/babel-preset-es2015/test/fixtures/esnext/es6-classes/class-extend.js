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

expect(new Dog().sayHi()).toBe('Hi, I am a dog. WOOF!');
