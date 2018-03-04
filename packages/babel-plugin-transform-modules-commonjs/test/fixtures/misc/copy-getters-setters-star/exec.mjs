import * as foo from "./moduleWithGetter";

assert.throws(() => foo.boo);

// No exception should be thrown
