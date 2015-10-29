class Person {
  static set DB(value) {
    assert.equal(value, 'mysql');
  }
}

Person.DB = 'mysql';
