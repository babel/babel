var obj = {
  [Symbol.iterator]: function() {
    var ttl = 3;
    return {
      next: function() {
        if (ttl === 0) {
          return { done: true, value: null };
        } else {
          return { done: false, value: ttl-- };
        }
      }
    };
  }
};

expect([3, 2, 1]).toEqual([...obj]);
