expect(() => {
  class Foo {
    [Foo + 1] = 2;
  };  
}).toThrow(ReferenceError);
