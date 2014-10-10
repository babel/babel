CLASS_NAME.prototype = Object.create(SUPER_NAME.prototype, {
  constructor: {
    value: CLASS_NAME,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
