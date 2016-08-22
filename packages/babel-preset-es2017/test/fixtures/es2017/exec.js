import '../../../polyfill';

async function asyncTimeout(delay) {
  return await new Promise((resolve) => {
    setTimeout(() => resolve('OK'), delay);
  });
}

suite('ES2017', () => {
  test('async functions', async () => {
    assert.equal(await asyncTimeout(10), 'OK');
  });

  test('Object.entries', () => {
    assert.deepEqual(Object.entries({q: 1, w: 2, e: 3}), [['q', 1], ['w', 2], ['e', 3]]);
  });

  test('Object.values', () => {
    assert.deepEqual(Object.values({q: 1, w: 2, e: 3}), [1, 2, 3]);
  });


  test('String.padStart', () => {
    assert.equal('abc'.padStart(6, '-'), '---abc');
  });

  test('String.padEnd', () => {
    assert.equal('xyz'.padEnd(6, '-'), 'xyz---');
  });

  test('Object.getOwnPropertyDescriptors', () => {
    const obj = {
      'foo': 123,
    };
    assert.deepEqual(Object.getOwnPropertyDescriptors(obj), {
      'foo': {
        value: 123,
        writable: true,
        enumerable: true,
        configurable: true,
      },
    });
  });

  test('Parses Trailing Commas in Function Param Lists', () => {
    function clownPuppiesEverywhere(
      param1,
      param2, // Trailing commas in function definition
    ) {
      return `${param1}${param2}`;
    }

    const works = clownPuppiesEverywhere(
      'foo',
      'bar',  // Trailing commas in function call
    );

    assert.equal(works, 'foobar');
  });
});
