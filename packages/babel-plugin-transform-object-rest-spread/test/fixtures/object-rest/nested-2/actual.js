const test = {
  foo: {
    bar: {
      baz: {
        a: {
          x: 1,
          y: 2,
          z: 3,
        },
      },
    },
  },
};

const { foo: { bar: { baz: { a: { x, ...other } } } } } = test;

const { foo: { ...bar }, after } = test;

const { foo: { bar: { ...baz } }, afterOther } = test;

const { foo: { bar: { ...qux } = {} }, another } = test;

const { foo: { bar: { ...pop }, poop }, pooop } = test;
