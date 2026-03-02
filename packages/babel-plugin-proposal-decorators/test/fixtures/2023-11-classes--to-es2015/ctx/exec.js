const logs = [];
function dec(value, ctx) {
  logs.push(ctx.kind, ctx.name);
}

@dec
class A {}

expect(logs).toEqual(["class", "A"]);
