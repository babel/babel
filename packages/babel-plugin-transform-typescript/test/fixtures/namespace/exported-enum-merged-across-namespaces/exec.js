// https://github.com/babel/babel/issues/16833
// Enums exported from a namespace must merge when the namespace is re-opened,
// rather than the later declaration resetting the enum to a fresh object.
namespace Foo {
  export namespace Bar {
    export enum E {
      x = 1,
    }
  }
}

namespace Foo {
  export namespace Bar {
    export enum E {
      y = 2,
    }
  }
}

expect(Foo.Bar.E.x).toBe(1);
expect(Foo.Bar.E.y).toBe(2);
expect(Foo.Bar.E).toEqual({ 1: "x", 2: "y", x: 1, y: 2 });
