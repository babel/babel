export const tests = {

  'untagged templates' (test) {
    test
    ._('without substitutions')
    .equals(`foobar`, 'foobar')
    ._('with one substitution')
    .equals(`foo${ 'something' }bar`, 'foosomethingbar')
    ;
  },

  'tagged templates' (test) {
    test
    ._('String.raw')
    .equals(String.raw`\u0064${ '-' }\u0064`, '\\u0064-\\u0064')
    ;
  },

};
