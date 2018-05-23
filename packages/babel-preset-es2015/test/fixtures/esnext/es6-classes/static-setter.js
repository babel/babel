class Person {
  static set DB(value) {
    expect(value).toBe('mysql');
  }
}

Person.DB = 'mysql';
