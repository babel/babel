{
  "invalid non-callable class decorators";
  const nonCallable = { call() {}, bind() {}, apply() {} }
  expect(() => @nonCallable class {}).toThrow("A decorator must be a function");
}

{
  "invalid non-callable field decorators";
  const nonCallable = { call() {}, bind() {}, apply() {} }
  expect(() => class { @nonCallable field }).toThrow("A decorator must be a function");
}

{
  "invalid non-callable accessor decorators";
  const nonCallable = { call() {}, bind() {}, apply() {} }
  expect(() => class { @nonCallable accessor accessor; }).toThrow("A decorator must be a function");
}

{
  "invalid non-callable method decorators";
  const nonCallable = { call() {}, bind() {}, apply() {} }
  expect(() => class { @nonCallable method() {} }).toThrow("A decorator must be a function");
}

{
  "invalid undefined class decorators";
  expect(() => @(void 0) class {}).toThrow("A decorator must be a function");
}

{
  "invalid undefined field decorators";
  expect(() => class { @(void 0) field }).toThrow("A decorator must be a function");
}

{
  "invalid undefined accessor decorators";
  expect(() => class { @(void 0) accessor accessor; }).toThrow("A decorator must be a function");
}

{
  "invalid undefined method decorators";
  expect(() => class { @(void 0) method() {} }).toThrow("A decorator must be a function");
}
