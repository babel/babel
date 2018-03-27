function testImplementsInPattern({implements}) {
  return implements;
}
expect(testImplementsInPattern({implements: 1})).toBe(1);

function testInterfaceInPattern({interface}) {
  return interface;
}
expect(testInterfaceInPattern({interface: 1})).toBe(1);

function testPackageInPattern({package}) {
  return package;
}
expect(testPackageInPattern({package: 1})).toBe(1);

function testPrivateInPattern({private}) {
  return private;
}
expect(testPrivateInPattern({private: 1})).toBe(1);

function testProtectedInPattern({protected}) {
  return protected;
}
expect(testProtectedInPattern({protected: 1})).toBe(1);

function testPublicInPattern({public}) {
  return public;
}
expect(testPublicInPattern({public: 1})).toBe(1);

function testStaticInPattern({static}) {
  return static;
}
expect(testStaticInPattern({static: 1})).toBe(1);

function testYieldInPattern({yield}) {
  return yield;
}
expect(testYieldInPattern({yield: 1})).toBe(1);
