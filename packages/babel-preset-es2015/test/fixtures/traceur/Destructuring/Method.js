function MyError(s) {
  this.message = new String(s);
  this.name = 'Error';
}

var object = {
  method({message: [head, ...tail], name}) {
    expect('a').toBe(head);
    expect(tail).toEqual(['b', 'c']);
    expect('Error').toBe(name);
  }
};

object.method(new MyError('abc'));
