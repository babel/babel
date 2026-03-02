function foo(this: number, x: number, y: string) {
  x + y + (arguments.length <= 2 ? undefined : arguments[2]);
}
