function dec(target, name, descriptor) {

}

class Example {
  @dec static prop;
}

expect(Example).toHaveProperty("prop");
expect(Example.prop).toBe(undefined);
