function a() {}

function* b() {}

async function c() {}

async function* d() {}

var e = function () {};

var f = function* () {};

var g = async function () {};

var h = async function* () {};

class A {
  a() {}

  *b() {}

  async c() {}

  async *d() {}

  e = () => {}; // f = () =>* {}

  g = async () => {}; // h = async () =>* {}

}