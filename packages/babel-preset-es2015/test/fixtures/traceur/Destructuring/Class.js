function MyError(s) {
  this.message = new String(s);
  this.name = 'Error';
}

class C {
  constructor({message: [head, ...tail], name}) {
    expect(head).toBe('a');
    expect(tail).toEqual(['b', 'c']);
    expect(name).toBe('Error');
  }

  method({message: [head, ...tail], name}) {
    expect(head).toBe('a');
    expect(tail).toEqual(['b', 'c']);
    expect(name).toBe('Error');
  }

  set x({message: [head, ...tail], name}) {
    expect(head).toBe('a');
    expect(tail).toEqual(['b', 'c']);
    expect(name).toBe('Error');
  }
}

var c = new C(new MyError('abc'));
c.method(new MyError('abc'));
c.x = new MyError('abc');
