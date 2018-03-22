var x = ':';

function* f() {
  label1: {
    x += 'a';
    yield 1;
    x += 'b'
    while (true && true) {
      break label1;
    }
    x += 'c';
  }
  x += 'd'
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
expect(x).toBe(':abd');


x = ':';

function* f2() {
  label1: {
    x += 'a';
    while(true) {
      x += 'b';
      label2: {
        x += 'c';
        yield 3;
        x += 'd';
        while (true) {
          break label1;
        }
        x += 'e';
      }
      x += 'f';
    }
    x += 'g';
  }
  x += 'h';
}

g = f2();
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
expect(x).toBe(':abcdh');
