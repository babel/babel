const calls = [];

`
  ${
    calls.push(1),
    {
      [Symbol.toPrimitive](){
        calls.push(2);
        return 'foo';
      }
    }
  }
  ${
    calls.push(3),
    {
      [Symbol.toPrimitive](){
        calls.push(4);
        return 'bar';
      }
    }
  }
`;

assert.deepEqual(calls, [1, 2, 3, 4]);
