// Options: --block-binding

{
  let i = 0, log = [];
  this.logger = function(...e) {
    log.push(e.join(' '));
  }

  // https://crbug.com/450942
  expect(typeof new Function`logger('a')`).toBe('object');
  expect(log).toEqual(['a']);

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

  expect(typeof new tag`a``b``c`).toBe('object');
  expect(log).toEqual([
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

  expect(new C`a``b``c`('test')).toEqual({ name: 'test' });
  expect(log).toEqual(['a', 'b', 'c', 't']);
}
