function testImplementsVar() {
  var implements = 1;
  return implements;
}
assert.equal(testImplementsVar(), 1);

function testInterfaceVar() {
  var interface = 1;
  return interface;
}
assert.equal(testInterfaceVar(), 1);

function testPackageVar() {
  var package = 1;
  return package;
}
assert.equal(testPackageVar(), 1);

function testPrivateVar() {
  var private = 1;
  return private;
}
assert.equal(testPrivateVar(), 1);

function testProtectedVar() {
  var protected = 1;
  return protected;
}
assert.equal(testProtectedVar(), 1);

function testPublicVar() {
  var public = 1;
  return public;
}
assert.equal(testPublicVar(), 1);

function testStaticVar() {
  var static = 1;
  return static;
}
assert.equal(testStaticVar(), 1);

function testYieldVar() {
  var yield = 1;
  return yield;
}
assert.equal(testYieldVar(), 1);
