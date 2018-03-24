import * as foo from "./moduleWithGetter";

expect(() => foo.boo).toThrow();

// No exception should be thrown
