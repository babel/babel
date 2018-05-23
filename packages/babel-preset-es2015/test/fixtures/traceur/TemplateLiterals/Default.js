// Options: --block-binding

expect(``).toBe('');
expect(`a`).toBe('a');
expect(`"`).toBe('"');
expect(`'`).toBe("'");
expect(`\``).toBe("`");
expect(`\"`).toBe('"');

expect(`\\"`).toBe('\\"');
expect(`"\\`).toBe('"\\');

expect(`\n`).toBe('\n');
expect(`\r`).toBe('\r');
expect(`\r\n`).toBe('\r\n');
expect(`\t`).toBe('\t');
expect(`\u2028`).toBe('\u2028');
expect(`\u2029`).toBe('\u2029');

expect(`$`).toBe('$');
expect(`$ a`).toBe('$ a');
expect(`$ {a}`).toBe('$ {a}');

expect(`${ undefined }`).toBe('undefined');
expect(`${ null }`).toBe('null');

{
  let $ = 'DOLLAR';
  let $$ = 'DD'
  expect(`$$`).toBe('$$');
  expect(`${$}`).toBe('DOLLAR');
  expect(`$$$`).toBe('$$$');
  expect(`${$}${$}`).toBe('DOLLARDOLLAR');
  expect(`${$}$$`).toBe('DOLLAR$$');
  expect(`$$${$}`).toBe('$$DOLLAR');
  expect(`\$$$`).toBe('$$$');

  let a = 'A';
  let b = 'B';
  expect(`a${a}b${b}`).toBe('aAbB');
  expect(`a${a}b$b`).toBe('aAb$b');
  expect(`$a.$b`).toBe('$a.$b');

  let x = 3;
  let y = 5;

  expect(`${x} + ${y} = ${ x + y}`).toBe('3 + 5 = 8');

  // nested
  expect(`${x} + ${ `${y} = ${ `${x + y}` }` }`).toBe('3 + 5 = 8');

  expect(`${x}`).toBe('3');
  expect(` ${x}`).toBe(' 3');
  expect(`${x} `).toBe('3 ');
  expect(`${x}${y}`).toBe('35');
  expect(` ${x}${y}`).toBe(' 35');
  expect(`${x} ${y}`).toBe('3 5');
  expect(`${x}${y} `).toBe('35 ');
  expect(` ${x} ${y} `).toBe(' 3 5 ');

  // def s(x):
  //   return ' ' if x else ''
  // for i in range(16):
  //   v = (s(i&8), s(i&4), s(i&2), s(i&1))
  //   print "expect('%s3%s5%s8%s').toBe(`%s${x}%s${y}%s${x+y}%s`);" % (v+v)
  expect(`${x}${y}${x+y}`).toBe('358');
  expect(`${x}${y}${x+y} `).toBe('358 ');
  expect(`${x}${y} ${x+y}`).toBe('35 8');
  expect(`${x}${y} ${x+y} `).toBe('35 8 ');
  expect(`${x} ${y}${x+y}`).toBe('3 58');
  expect(`${x} ${y}${x+y} `).toBe('3 58 ');
  expect(`${x} ${y} ${x+y}`).toBe('3 5 8');
  expect(`${x} ${y} ${x+y} `).toBe('3 5 8 ');
  expect(` ${x}${y}${x+y}`).toBe(' 358');
  expect(` ${x}${y}${x+y} `).toBe(' 358 ');
  expect(` ${x}${y} ${x+y}`).toBe(' 35 8');
  expect(` ${x}${y} ${x+y} `).toBe(' 35 8 ');
  expect(` ${x} ${y}${x+y}`).toBe(' 3 58');
  expect(` ${x} ${y}${x+y} `).toBe(' 3 58 ');
  expect(` ${x} ${y} ${x+y}`).toBe(' 3 5 8');
  expect(` ${x} ${y} ${x+y} `).toBe(' 3 5 8 ');
}

// Line continuations
expect(`a\
b`).toBe('ab');
expect(`a\
\
b`).toBe('ab');

expect(`
`).toBe('\n');
expect(`

`).toBe('\n\n');
