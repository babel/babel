expect(() => {
  class Foo {
    [Foo] = 1;
  };  
}).toThrow(ReferenceError);
