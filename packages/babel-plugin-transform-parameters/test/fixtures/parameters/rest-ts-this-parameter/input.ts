function u(this: Foo, ...items) {
  items[0];
}

function v(this: Foo, event: string, ...args: any[]) {
  args;
}
