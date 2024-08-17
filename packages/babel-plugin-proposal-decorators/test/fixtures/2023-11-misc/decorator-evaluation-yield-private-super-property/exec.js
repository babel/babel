{
  let B;

  class CaptureFactory {
    static *id(fn) {
      yield fn;
    }
  }

  function dummy() {}

  class A extends CaptureFactory {
    static #X = "A#X";
    static *[Symbol.iterator] () {
      B = class B {
        static #X = "B#X";
        @(yield* super.id(_ => _.#X), dummy) method () {}
        @(yield* super.id(_ => _.#X), dummy) static method () {}
        @(yield* super.id(_ => _.#X), dummy) get getter () {}
        @(yield* super.id(_ => _.#X), dummy) static get getter () {}
        @(yield* super.id(_ => _.#X), dummy) set setter (v) {}
        @(yield* super.id(_ => _.#X), dummy) static set setter (v) {}
        @(yield* super.id(_ => _.#X), dummy) property;
        @(yield* super.id(_ => _.#X), dummy) static property;
        @(yield* super.id(_ => _.#X), dummy) accessor accessor;
        @(yield* super.id(_ => _.#X), dummy) static accessor accessor;
      }
    }
  }

  expect([...A].map(fn => fn(B)).join(",")).toBe("B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X");
}

{
  let B;

  class CaptureFactory {
    static *id(fn) {
      yield fn;
    }
  }

  function dummy() {}

  class A extends CaptureFactory {
    static #X = "A#X";
    static *[Symbol.iterator] () {
      B = @dummy
      class B {
        static #X = "B#X";
        @(yield* super.id(_ => _.#X), dummy) method () {}
        @(yield* super.id(_ => _.#X), dummy) static method () {}
        @(yield* super.id(_ => _.#X), dummy) get getter () {}
        @(yield* super.id(_ => _.#X), dummy) static get getter () {}
        @(yield* super.id(_ => _.#X), dummy) set setter (v) {}
        @(yield* super.id(_ => _.#X), dummy) static set setter (v) {}
        @(yield* super.id(_ => _.#X), dummy) property;
        @(yield* super.id(_ => _.#X), dummy) static property;
        @(yield* super.id(_ => _.#X), dummy) accessor accessor;
        @(yield* super.id(_ => _.#X), dummy) static accessor accessor;
      }
    }
  }

  expect([...A].map(fn => fn(B)).join(",")).toBe("B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X");
}

{
  let B;

  class CaptureFactory {
    static *id(fn) {
      yield fn;
    }
  }

  function dummy() {}

  class A extends CaptureFactory {
    static #X = "A#X";
    static *[Symbol.iterator] () {
      B = class {
        static #X = "B#X";
        @(yield* super.id(_ => _.#X), dummy) #method () {}
        @(yield* super.id(_ => _.#X), dummy) static #Method () {}
        @(yield* super.id(_ => _.#X), dummy) get #getter () {}
        @(yield* super.id(_ => _.#X), dummy) static get #Getter () {}
        @(yield* super.id(_ => _.#X), dummy) set #setter (v) {}
        @(yield* super.id(_ => _.#X), dummy) static set #Setter (v) {}
        @(yield* super.id(_ => _.#X), dummy) #property;
        @(yield* super.id(_ => _.#X), dummy) static #Property;
        @(yield* super.id(_ => _.#X), dummy) accessor #accessor;
        @(yield* super.id(_ => _.#X), dummy) static accessor #Accessor;
      }
    }
  }

  expect([...A].map(fn => fn(B)).join(",")).toBe("B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X,B#X");
}
