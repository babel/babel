const fn = () => `${Symbol()}`;

assert.throws(fn, TypeError);
