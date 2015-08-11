// Options: --block-binding

assert.equal('', ``);
assert.equal('a', `a`);
assert.equal('"', `"`);
assert.equal("'", `'`);
assert.equal("`", `\``);
assert.equal('"', `\"`);

assert.equal('\\"', `\\"`);
assert.equal('"\\', `"\\`);

assert.equal('\n', `\n`);
assert.equal('\r', `\r`);
assert.equal('\r\n', `\r\n`);
assert.equal('\t', `\t`);
assert.equal('\u2028', `\u2028`);
assert.equal('\u2029', `\u2029`);

assert.equal('$', `$`);
assert.equal('$ a', `$ a`);
assert.equal('$ {a}', `$ {a}`);

assert.equal('undefined', `${ undefined }`);
assert.equal('null', `${ null }`);

{
  let $ = 'DOLLAR';
  let $$ = 'DD'
  assert.equal('$$', `$$`);
  assert.equal('DOLLAR', `${$}`);
  assert.equal('$$$', `$$$`);
  assert.equal('DOLLARDOLLAR', `${$}${$}`);
  assert.equal('DOLLAR$$', `${$}$$`);
  assert.equal('$$DOLLAR', `$$${$}`);
  assert.equal('$$$', `\$$$`);

  let a = 'A';
  let b = 'B';
  assert.equal('aAbB', `a${a}b${b}`);
  assert.equal('aAb$b', `a${a}b$b`);
  assert.equal('$a.$b', `$a.$b`);

  let x = 3;
  let y = 5;

  assert.equal('3 + 5 = 8', `${x} + ${y} = ${ x + y}`);

  // nested
  assert.equal('3 + 5 = 8', `${x} + ${ `${y} = ${ `${x + y}` }` }`);

  assert.equal('3', `${x}`);
  assert.equal(' 3', ` ${x}`);
  assert.equal('3 ', `${x} `);
  assert.equal('35', `${x}${y}`);
  assert.equal(' 35', ` ${x}${y}`);
  assert.equal('3 5', `${x} ${y}`);
  assert.equal('35 ', `${x}${y} `);
  assert.equal(' 3 5 ', ` ${x} ${y} `);

  // def s(x):
  //   return ' ' if x else ''
  // for i in range(16):
  //   v = (s(i&8), s(i&4), s(i&2), s(i&1))
  //   print "assert.equal('%s3%s5%s8%s', `%s${x}%s${y}%s${x+y}%s`);" % (v+v)
  assert.equal('358', `${x}${y}${x+y}`);
  assert.equal('358 ', `${x}${y}${x+y} `);
  assert.equal('35 8', `${x}${y} ${x+y}`);
  assert.equal('35 8 ', `${x}${y} ${x+y} `);
  assert.equal('3 58', `${x} ${y}${x+y}`);
  assert.equal('3 58 ', `${x} ${y}${x+y} `);
  assert.equal('3 5 8', `${x} ${y} ${x+y}`);
  assert.equal('3 5 8 ', `${x} ${y} ${x+y} `);
  assert.equal(' 358', ` ${x}${y}${x+y}`);
  assert.equal(' 358 ', ` ${x}${y}${x+y} `);
  assert.equal(' 35 8', ` ${x}${y} ${x+y}`);
  assert.equal(' 35 8 ', ` ${x}${y} ${x+y} `);
  assert.equal(' 3 58', ` ${x} ${y}${x+y}`);
  assert.equal(' 3 58 ', ` ${x} ${y}${x+y} `);
  assert.equal(' 3 5 8', ` ${x} ${y} ${x+y}`);
  assert.equal(' 3 5 8 ', ` ${x} ${y} ${x+y} `);
}

// Line continuations
assert.equal('ab', `a\
b`);
assert.equal('ab', `a\
\
b`);

assert.equal('\n', `
`);
assert.equal('\n\n', `

`);
