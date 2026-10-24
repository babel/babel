import { NestedObjects } from "./some-module"

const { Foo, Bar } = NestedObjects

expect(Foo).toBe("foo");
expect(Bar).toBe("bar");
