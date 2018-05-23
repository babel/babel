function testImplementsVar() {
  var implements = 1;
  return implements;
}
expect(testImplementsVar()).toBe(1);

function testInterfaceVar() {
  var interface = 1;
  return interface;
}
expect(testInterfaceVar()).toBe(1);

function testPackageVar() {
  var package = 1;
  return package;
}
expect(testPackageVar()).toBe(1);

function testPrivateVar() {
  var private = 1;
  return private;
}
expect(testPrivateVar()).toBe(1);

function testProtectedVar() {
  var protected = 1;
  return protected;
}
expect(testProtectedVar()).toBe(1);

function testPublicVar() {
  var public = 1;
  return public;
}
expect(testPublicVar()).toBe(1);

function testStaticVar() {
  var static = 1;
  return static;
}
expect(testStaticVar()).toBe(1);

function testYieldVar() {
  var yield = 1;
  return yield;
}
expect(testYieldVar()).toBe(1);
