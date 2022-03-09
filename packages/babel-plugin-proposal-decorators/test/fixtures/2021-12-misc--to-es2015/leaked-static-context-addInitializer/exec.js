let addInitializer, i = 0;
const logs = [];

function decCallStaticAddInitializer() {
  addInitializer(() => logs.push(i++));
}

function decStaticMethod(_, context) {
  ({ addInitializer } = context);
  addInitializer(() => logs.push(i++));
}

@decCallStaticAddInitializer
class C {
  @decStaticMethod static m() {}
  @decCallStaticAddInitializer n() {}
}

new C;

expect(logs).toEqual([0, 1]);
