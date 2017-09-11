assert.throws(function() {
  for (const i = 0; i < 3; i = i + 1) {
    // whatever
  }
}, '"i" is read-only');
