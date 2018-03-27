var i = 0;
var s = '';

function* f() {
  s += 'a';
  while(i++ < 3) {
    s += 'b';
    label1: {
      s += 'c';
      break label1;
      s += 'd';
    }
    s += 'e';
  }
  s += 'f';
}

var g = f();
g.next();
expect(s).toBe('abcebcebcef');
