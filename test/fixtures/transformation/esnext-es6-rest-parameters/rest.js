var join = function(joinStr, ...items) {
  return items.join(joinStr);
};

assert.deepEqual(join(' ', 'a', 'b', 'c'), 'a b c');
