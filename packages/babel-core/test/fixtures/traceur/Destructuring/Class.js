function MyError(s) {
  this.message = new String(s);
  this.name = 'Error';
}

class C {
  constructor({message: [head, ...tail], name}) {
    assert.equal('a', head);
    assertArrayEquals(['b', 'c'], tail);
    assert.equal('Error', name);
  }

  method({message: [head, ...tail], name}) {
    assert.equal('a', head);
    assertArrayEquals(['b', 'c'], tail);
    assert.equal('Error', name);
  }

  set x({message: [head, ...tail], name}) {
    assert.equal('a', head);
    assertArrayEquals(['b', 'c'], tail);
    assert.equal('Error', name);
  }
}

var c = new C(new MyError('abc'));
c.method(new MyError('abc'));
c.x = new MyError('abc');
