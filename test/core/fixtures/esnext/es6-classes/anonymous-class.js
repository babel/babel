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

assert.equal(new Dog().sayHi(), 'Hi, I am a dog. WOOF!');
assert.equal(Dog.getName(), 'Animal/Dog');

var count = 0;
var Cat = class extends (function(){ count++; return Animal; })() {};

assert.equal(count, 1);
