expect(() => {
  using fooTDZ = class { static self = fooTDZ }
}).toThrow("Cannot access 'fooTDZ' before initialization")
