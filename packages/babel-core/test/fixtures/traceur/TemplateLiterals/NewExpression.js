// Options: --block-binding

{
  let i = 0, log = [];
  this.logger = function(...e) {
    log.push(e.join(' '));
  }

  // https://crbug.com/450942
  assert.equal(typeof new Function`logger('a')`, 'object');
  assert.deepEqual(log, ['a']);

  log.length = 0;
  function tag(...e) {
    var text = e[0] && String.raw(...e);
    if (this instanceof tag) {
      log.push('new;' + text);
    } else {
      log.push('tag;' + text);
      return tag;
    }
  }

  assert.equal(typeof new tag`a``b``c`, 'object');
  assert.deepEqual(log, [
    'tag;a',
    'tag;b',
    'tag;c',
    'new;undefined'
  ]);

  log.length = 0;
  function C(cs) {
    log.push(cs[0]);
    if (this instanceof C) {
      this.name = cs;
    } else {
      return C;
    }
  }

  assert.deepEqual(new C`a``b``c`('test'), { name: 'test' });
  assert.deepEqual(log, ['a', 'b', 'c', 't']);
}
