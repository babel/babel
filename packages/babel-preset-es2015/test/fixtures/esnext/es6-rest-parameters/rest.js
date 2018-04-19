var join = function(joinStr, ...items) {
  return items.join(joinStr);
};

expect(join(' ', 'a', 'b', 'c')).toBe('a b c');
