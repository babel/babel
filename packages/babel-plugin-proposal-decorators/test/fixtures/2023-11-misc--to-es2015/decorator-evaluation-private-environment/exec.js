{
  let staticFns = [], fns = []
  let B;

  function capture(staticFn, fn) {
    staticFns.push(staticFn);
    fns.push(fn);
  }

  function dummy() {}

  class A {
    static #X = "A#X";
    #x = "a#x";
    constructor () {
      B = class B {
        static #X = "B#X";
        #x = "b#x";
        @(capture(_ => _.#X, _ => _.#x), dummy) method () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static method () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) get getter () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static get getter () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) set setter (v) {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static set setter (v) {}
        @(capture(_ => _.#X, _ => _.#x), dummy) property;
        @(capture(_ => _.#X, _ => _.#x), dummy) static property;
        @(capture(_ => _.#X, _ => _.#x), dummy) accessor accessor;
        @(capture(_ => _.#X, _ => _.#x), dummy) static accessor accessor;
      }
    }
  }

  let a = new A(), b = new B();

  expect(staticFns.map(fn => fn(B)).join()).toBe("B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X");
  expect(fns.map(fn => fn(b)).join()).toBe("b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x");
}

{
  let staticFns = [], fns = []
  let B;

  function capture(staticFn, fn) {
    staticFns.push(staticFn);
    fns.push(fn);
  }

  function dummy() {}

  class A {
    static #X = "A#X";
    #x = "a#x";
    constructor () {
      B = class B {
        static #X = "B#X";
        #x = "b#x";
        @(capture(_ => _.#X, _ => _.#x), dummy) #method () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static #Method () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) get #getter () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static get #Getter () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) set #setter (v) {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static set #Setter (v) {}
        @(capture(_ => _.#X, _ => _.#x), dummy) #property;
        @(capture(_ => _.#X, _ => _.#x), dummy) static #Property;
        @(capture(_ => _.#X, _ => _.#x), dummy) accessor #accessor;
        @(capture(_ => _.#X, _ => _.#x), dummy) static accessor #Accessor;
      }
    }
  }

  let a = new A(), b = new B();

  expect(staticFns.map(fn => fn(B)).join()).toBe("B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X");
  expect(fns.map(fn => fn(b)).join()).toBe("b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x");
}

{
  let staticFns = [], fns = []
  let B;

  function capture(staticFn, fn) {
    staticFns.push(staticFn);
    fns.push(fn);
  }

  function dummy() {}

  class A {
    static #X = "A#X";
    #x = "a#x";
    constructor () {
      B =
      @(capture(_ => _.#X, _ => _.#x), dummy)
      class B {
        static #X = "B#X";
        #x = "b#x";
        @(capture(_ => _.#X, _ => _.#x), dummy) method () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static method () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) get getter () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static get getter () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) set setter (v) {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static set setter (v) {}
        @(capture(_ => _.#X, _ => _.#x), dummy) property;
        @(capture(_ => _.#X, _ => _.#x), dummy) static property;
        @(capture(_ => _.#X, _ => _.#x), dummy) accessor accessor;
        @(capture(_ => _.#X, _ => _.#x), dummy) static accessor accessor;
      }
    }
  }

  let a = new A(), b = new B();
  expect(staticFns.shift()(A)).toBe("A#X");
  expect(fns.shift()(a)).toBe("a#x");

  expect(staticFns.map(fn => fn(B)).join()).toBe("B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X");
  expect(fns.map(fn => fn(b)).join()).toBe("b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x");
}

{
  let staticFns = [], fns = []
  let B;

  function capture(staticFn, fn) {
    staticFns.push(staticFn);
    fns.push(fn);
  }

  function dummy() {}

  class A {
    static #X = "A#X";
    #x = "a#x";
    constructor () {
      B =
      @(capture(_ => _.#X, _ => _.#x), dummy)
      class B {
        static #X = "B#X";
        #x = "b#x";
        @(capture(_ => _.#X, _ => _.#x), dummy) #method () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static #Method () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) get #getter () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static get #Getter () {}
        @(capture(_ => _.#X, _ => _.#x), dummy) set #setter (v) {}
        @(capture(_ => _.#X, _ => _.#x), dummy) static set #Setter (v) {}
        @(capture(_ => _.#X, _ => _.#x), dummy) #property;
        @(capture(_ => _.#X, _ => _.#x), dummy) static #Property;
        @(capture(_ => _.#X, _ => _.#x), dummy) accessor #accessor;
        @(capture(_ => _.#X, _ => _.#x), dummy) static accessor #Accessor;
      }
    }
  }

  let a = new A(), b = new B();
  expect(staticFns.shift()(A)).toBe("A#X");
  expect(fns.shift()(a)).toBe("a#x");

  expect(staticFns.map(fn => fn(B)).join()).toBe("B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X");
  expect(fns.map(fn => fn(b)).join()).toBe("b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x,b#x");
}
