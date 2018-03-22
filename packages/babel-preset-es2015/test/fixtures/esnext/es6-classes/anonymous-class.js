var Animal = class {
  sayHi() {
    return 'Hi, I am a '+this.type()+'.';
  }

  static getName() {
    return 'Animal';
  }
};

var Dog = class extends Animal {
  type() { return 'dog'; }

  sayHi() {
    return super.sayHi() + ' WOOF!';
  }

  static getName() {
    return super.getName() + '/Dog';
  }
};

expect(new Dog().sayHi()).toBe('Hi, I am a dog. WOOF!');
expect(Dog.getName()).toBe('Animal/Dog');

var count = 0;
var Cat = class extends (function(){ count++; return Animal; })() {};

expect(count).toBe(1);
