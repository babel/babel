const noop = () => {};
{
  const log = {
    *[Symbol.iterator]() {

      class Foo {
        @(yield 1, noop) method() {}
        @(yield 2, noop) static method() {}
        @(yield 3, noop) field;
        @(yield 4, noop) static field;
        @(yield 5, noop) get getter() {
          return;
        }
        @(yield 6, noop) static get getter() {
          return;
        }
        @(yield 7, noop) set setter(x) {}
        @(yield 8, noop) static set setter(x) {}
        @(yield 9, noop) accessor accessor;
        @(yield 10, noop) static accessor accessor;
      }
    },
  };
  expect([...log].join()).toBe("1,2,3,4,5,6,7,8,9,10");
}
{
  let Foo;
  const log = {
    *[Symbol.iterator]() {

      Foo = class {
        @(yield 0, noop) [(yield 1, "method")]() {}
        @(yield 2, noop) static method() {}
        @(yield 3, noop) field;
        @(yield 4, noop) static field;
        @(yield 5, noop) get getter() {
          return;
        }
        @(yield 6, noop) static get getter() {
          return;
        }
        @(yield 7, noop) set setter(x) {}
        @(yield 8, noop) static set setter(x) {}
        @(yield 9, noop) accessor accessor;
        @(yield 10, noop) static accessor accessor;
      }
    },
  };
  expect([...log].join()).toBe("0,1,2,3,4,5,6,7,8,9,10");
  expect((new Foo())).toHaveProperty("method");
}
{
  const log = {
    *[Symbol.iterator]() {
      @(yield 0, noop)
      class Foo {
        @(yield 1, noop) method() {}
        @(yield 2, noop) static method() {}
        @(yield 3, noop) field;
        @(yield 4, noop) static field;
        @(yield 5, noop) get getter() {
          return;
        }
        @(yield 6, noop) static get getter() {
          return;
        }
        @(yield 7, noop) set setter(x) {}
        @(yield 8, noop) static set setter(x) {}
        @(yield 9, noop) accessor accessor;
        @(yield 10, noop) static accessor accessor;
      }
    },
  };
  expect([...log].join()).toBe("0,1,2,3,4,5,6,7,8,9,10");
}

{
  let Foo;
  const log = {
    *[Symbol.iterator]() {
      Foo = @(yield 0, noop)
      class {
        @(yield 1, noop) method() {}
        @(yield 2, noop) static method() {}
        @(yield 3, noop) field;
        @(yield 4, noop) static field;
        @(yield 5, noop) get getter() {
          return;
        }
        @(yield 6, noop) static get getter() {
          return;
        }
        @(yield 7, noop) set setter(x) {}
        @(yield 8, noop) static set setter(x) {}
        @(yield 9, noop) accessor accessor;
        @(yield 10, noop) static accessor [(yield 11, "accessor")];
      }
    },
  };
  expect([...log].join()).toBe("0,1,2,3,4,5,6,7,8,9,10,11");
  expect(Foo).toHaveProperty("accessor");
}
