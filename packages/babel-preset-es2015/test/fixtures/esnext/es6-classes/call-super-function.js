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

expect(new Horse().sayHi()).toBe('WAT?!');
