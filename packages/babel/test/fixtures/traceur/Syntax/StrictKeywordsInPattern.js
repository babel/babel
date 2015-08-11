function testImplementsInPattern({implements}) {
  return implements;
}
assert.equal(testImplementsInPattern({implements: 1}), 1);

function testInterfaceInPattern({interface}) {
  return interface;
}
assert.equal(testInterfaceInPattern({interface: 1}), 1);

function testPackageInPattern({package}) {
  return package;
}
assert.equal(testPackageInPattern({package: 1}), 1);

function testPrivateInPattern({private}) {
  return private;
}
assert.equal(testPrivateInPattern({private: 1}), 1);

function testProtectedInPattern({protected}) {
  return protected;
}
assert.equal(testProtectedInPattern({protected: 1}), 1);

function testPublicInPattern({public}) {
  return public;
}
assert.equal(testPublicInPattern({public: 1}), 1);

function testStaticInPattern({static}) {
  return static;
}
assert.equal(testStaticInPattern({static: 1}), 1);

function testYieldInPattern({yield}) {
  return yield;
}
assert.equal(testYieldInPattern({yield: 1}), 1);
