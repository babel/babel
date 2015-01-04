class Animal {
  sayHi() {
    return 'I am an animal.'
  }

  sayOther() {
    return 'WAT?!';
  }
}

class Horse extends Animal {
  sayHi() {
    return super.sayOther();
  }

  sayOther() {
    return 'I see dead objects.';
  }
}

assert.equal(new Horse().sayHi(), 'WAT?!');
