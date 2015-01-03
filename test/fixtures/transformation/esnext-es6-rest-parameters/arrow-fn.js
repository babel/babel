/* jshint esnext: true */
/* global expect */

var join = (joinStr, ...items) => {
  return items.join(joinStr);
};

expect(join(' ', 'a', 'b', 'c')).to.equal('a b c');
