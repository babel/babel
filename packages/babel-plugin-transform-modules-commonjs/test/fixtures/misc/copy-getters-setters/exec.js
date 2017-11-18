import Foo, { baz } from "./moduleWithGetter";

// Should not execute the getter in the imported module which would throw
