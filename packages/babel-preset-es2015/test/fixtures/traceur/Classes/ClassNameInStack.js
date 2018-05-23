class MyClassName {
  m() {
    throw new Error();
  }
}

try {
  new MyClassName().m();
  fail('Should have thrown');
} catch (ex) {
  if (ex.stack)
    expect(String(ex.stack)).toEqual(expect.stringContaining('MyClassName'));
}

//////////////////////////////////////////////////////////////////////////////

class MySecondClass extends MyClassName{
  m() {
    throw new Error();
  }
}

try {
  new MySecondClass().m();
  fail('Should have thrown');
} catch (ex) {
  if (ex.stack)
    expect(String(ex.stack)).toEqual(expect.stringContaining('MySecondClass'));
}
