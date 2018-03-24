function dec(target, name, descriptor) {

}

class Example {
  @dec static prop;
}

expect(Example.hasOwnProperty("prop")).toBeTruthy();
expect(Example.prop).toBe(undefined);
