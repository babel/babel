const decWithInitializer = (init) => (_, context) => { context.addInitializer(init) }

expect(() => class { @decWithInitializer(null) static m() {} }).toThrow("An initializer must be a function")
expect(() => class { @decWithInitializer(false) static m() {} }).toThrow("An initializer must be a function")
expect(() => class { @decWithInitializer(void 0) static m() {} }).toThrow("An initializer must be a function");
expect(() => class { @decWithInitializer(() => {}) static m() {} }).not.toThrow();
