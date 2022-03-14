let addInitializer, i = 0;
const logs = [];

function decCallProtoAddInitializer() {
  addInitializer(() => logs.push(i++));
}

function decMethod(_, context) {
  ({ addInitializer } = context);
  addInitializer(() => logs.push(i++));
}

@decCallProtoAddInitializer
class C {
  @decMethod m() {}
  @decCallProtoAddInitializer static n() {}
}

new C;

expect(logs).toEqual([0, 1]);
